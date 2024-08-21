import Result from "../models/Result.js"

class ResultController {
    static async createResult(req,res) {
        try {
            const {student_id, exam_id, score,answers} = req.body
            const result = new Result({student_id, exam_id, score, answers})
            await result.save()
            res.status(201).json(result)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }
    static async getAll(req,res){
        try {
            const results = await Result.find().populate('answers.question_id').exec()
            if (results.length === 0) {
                return res.status(404).json({ message: 'No results found for this exam' })
              }
              res.status(200).json(results)

        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    static async getResultsbyStudent (req,res){
        try {
            const { id } = req.params
        
            const results = await Result.find({ student_id: id })
              .populate('exam_id')
              .populate('answers.question_id')
              .exec()
        
            if (results.length === 0) {
              return res.status(404).json({ message: 'No results found for this student' });
            }
        
            res.status(200).json(results)
          } catch (error) {
            res.status(400).json({ error: error.message })
          }
    }
}

export default ResultController