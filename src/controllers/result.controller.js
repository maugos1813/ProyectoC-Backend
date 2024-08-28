import Result from "../models/Result.js"

class ResultController {
  static async createResult(req, res) {
    try {
      const { student_id, exam_id, score, answers } = req.body;

      let answersToProcess;
      if (typeof answers === 'string') {
        try {
          answersToProcess = JSON.parse(answers);
        } catch (error) {
          return res.status(400).json({ error: 'Invalid JSON format for answers' });
        }
      } else {
        answersToProcess = answers;
      }
  
      if (!answersToProcess || !Array.isArray(answersToProcess) || answersToProcess.length === 0) {
        return res.status(400).json({ error: 'Invalid format for answers' });
      }
      const processedAnswers = await Promise.all(answersToProcess.map(async answer => {
        if (answer.question_type === "video" && req.file) {
          const filename = req.file.filename; 
          console.log("estoy aqui")
          return {
            ...answer,
            answer: filename 
          };
        } else {
          return answer;
        }
      }));
  
      const result = new Result({ student_id, exam_id, score, answers: processedAnswers });
      await result.save();
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
    static async getAll(req, res){
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

     
  static async getAllVideoQuestions(req, res) {
    try {
        const results = await Result.find().exec();
        const videoAnswers = results.flatMap(result => 
            result.answers.filter(answer => answer.question_type === 'video')
        );
        res.status(200).json(videoAnswers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


}

export default ResultController