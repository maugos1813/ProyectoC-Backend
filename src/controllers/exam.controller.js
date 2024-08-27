import Exam from '../models/Exam.js'
import Question from '../models/Question.js'

class ExamController {
    static async createWithQuestions(req, res) {
        try {
            const { title, description, user_id, level_id, questions } = req.body
            const createdQuestions = await Promise.all(
                questions.map(async questionData => {
                    const question = new Question({
                        ...questionData,
                        exam_id: null
                    })
                    await question.save()
                    return question
                })
            )
            const exam = new Exam({
                name: title,
                user_id,
                level_id,
                created_Date: new Date(),
                questions: createdQuestions.map(q => q._id)
            })

            await exam.save()

            await Promise.all(
                createdQuestions.map(async question => {
                    question.exam_id = exam._id
                    await question.save()
                })
            )
            res.status(201).json(exam)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async updateWithQuestions(req, res) {
        try {
            const { id } = req.params
            const { title, description, user_id, level_id, questions } = req.body
            const exam = await Exam.findById(id)
            if (!exam) return res.status(404).json({ message: 'Exam not found' })
            exam.name = title || exam.name
            exam.user_id = user_id || exam.user_id
            exam.level_id = level_id || exam.level_id
            exam.description = description || exam.description

            for (const q of questions) {
                if (q._id) {
                    await Question.findByIdAndUpdate(q._id, {
                        ...q,
                        exam_id: id
                    })
                } else {
                    const createdQuestion = await Question.create({
                        ...q,
                        exam_id: id
                    })
                    exam.questions.push(createdQuestion._id)
                }
            }
            await exam.save()
            res.status(200).json(exam)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async getExam(req, res) {
        try {
            const { id } = req.params;
            const exam = await Exam.findById(id)
                .populate({
                    path: 'questions',
                    select: '-correctAnswer'
                })
                .exec();

            if (!exam) return res.status(404).json({ message: 'Exam not found' });

            res.status(200).json(exam);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const exams = await Exam.find()
                .populate('user_id')
                .populate('level_id')
                .populate({
                    path: 'questions',
                    select: '-correctAnswer'
                })
                .exec();
                
            res.json(exams);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}
export default ExamController