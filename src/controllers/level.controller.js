import Level from '../models/Level.js'
import User from '../models/User.js'
import Exam from '../models/Exam.js'

class LevelController {
    static async getExamsByLevel(req, res){
        try {
            const { id } = req.params
            console.log(id)
            const exams = await Exam.find({ level_id: id }).populate({path: 'questions'}).populate({path: 'user_id'}).populate({path: 'level_id',}).exec()
        
            if (exams.length === 0) {
              return res.status(404).json({ message: 'No exams found for this level' })
            }
        
            res.status(200).json(exams)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async getUsersByLevel(req,res){
        try {
            const { id } = req.params
            const exams = await User.find({ level_id: id })
        
            if (exams.length === 0) {
              return res.status(404).json({ message: 'No users found for this level' })
            }
        
            res.status(200).json(exams)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    static async getAll(req,res){
        try {

            const levels = await Level.aggregate([
                {
                    $lookup: {
                        from: 'users', 
                        localField: '_id', 
                        foreignField: 'level_id', 
                        as: 'teachers'
                    }
                },
                {
                    $unwind: { 
                        path: "$teachers", 
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $match: {
                        'teachers.type': 'teacher' 
                    }
                },
                {
                    $group: {
                        _id: "$_id", 
                        name: { $first: "$name" },
                        sub_name: { $first: "$sub_name" },
                        teachers: { $push: "$teachers" } 
                    }
                },
                {
                    $project: {
                        'teachers.password': 0, 
                        'teachers.type': 0, 
                        'teachers.creationDate': 0, 
                        'teachers.lastConnection': 0,
                        'teachers.level_id': 0, 
                        'teachers.__v':0
                    }
                }
            ])


            if (levels.length === 0) {
                return res.status(404).json({ message: 'No levels found' })
              }
          
              res.status(200).json(levels)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }


}
export default LevelController