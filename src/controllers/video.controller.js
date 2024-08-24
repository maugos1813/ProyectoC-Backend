import Video from '../models/Video.js'
import fs from 'fs'
import path from 'path'

class VideoController{
    static async createVideo (req, res) {
        try {
          const { title, user, exam } = req.body
          const videoPath = req.file.path
          console.log(videoPath)
      
          const video = await Video.create({
            title,
            user,
            exam,
            videoPath,
            createdAt: Date.now()
          })
          //await video.save()
          res.status(201).json(video)
        } catch (error) {
          res.status(400).json({ message: error.message })
        }
      }
      
      static async getAllVideos (req, res)  {
        try {
          const videos = await Video.find().populate('user_id').populate('exam_id').exec()
          res.json(videos)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }
      
      static async getVideoById (req, res)  {
        try {
          const { id } = req.params
          const video = await Video.findById(id).populate('user_id').populate('exam_id')
      
          if (!video) {
            return res.status(404).json({ message: 'Video not found' })
          }
      
          res.json(video)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }
      
      
      static async deleteVideo (req, res)  {
        try {
          const { id } = req.params
          const video = await Video.findById(id)
      
          if (!video) {
            return res.status(404).json({ message: 'Video not found' })
          }
      
          if (video.videoPath) {
            fs.unlinkSync(video.videoPath) 
          }
      
          await video.remove()
          res.json({ message: 'Video deleted successfully' })
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }
}

export default VideoController
