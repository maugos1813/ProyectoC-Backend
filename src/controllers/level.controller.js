import Level from '../models/Level.js'
import User from '../models/User.js'
import Exam from '../models/Exam.js'

class LevelController {
    static async getExamsByLevel(req, res){
        try {
            const { id } = req.params
            console.log(id)
            // Buscar exámenes por nivel
            const exams = await Exam.find({ level_id: id }).populate('questions').exec()
        
            if (exams.length === 0) {
              return res.status(404).json({ message: 'No exams found for this level' })
            }
        
            res.status(200).json(exams);
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async getUsersByLevel(req,res){
        try {
            const { id } = req.params
           
            // Buscar exámenes por nivel
            const exams = await User.find({ level_id: id })
        
            if (exams.length === 0) {
              return res.status(404).json({ message: 'No users found for this level' })
            }
        
            res.status(200).json(exams);
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }


}
export default LevelController