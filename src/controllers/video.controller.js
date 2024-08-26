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
          const wantsFile = req.query.file === 'true'

          if (!wantsFile) {
            return res.json(video)
          }

          const videoPath = path.resolve(video.filePath)

          if (!fs.existsSync(videoPath)) {
            return res.status(404).json({ message: 'Video file not found' })
          }

          console.log(`Streaming video: ${videoPath}`)
          
          const stat = fs.statSync(videoPath)
          const fileSize = stat.size
          const range = req.headers.range
          
          if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
            const chunkSize = (end - start) + 1
            const file = fs.createReadStream(videoPath, {start, end})
            const head = {
              'Content-Range': `bytes ${start}-${end}/${fileSize}`,
              'Accept-Ranges': 'bytes',
              'Content-Length': chunkSize,
              'Content-Type': 'video/mp4', //would be a problem, I'll check later. Abraham, please check with different file types. 
            }
            res.writeHead(206, head)
            file.pipe(res)
          } else {
            const head = {
              'Content-Length': fileSize,
              'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            fs.createReadStream(videoPath).pipe(res)
          }
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
