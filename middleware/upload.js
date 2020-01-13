const config = require('config')
const URI = config.get('mongoURI')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const path = require('path')
const crypto = require('crypto')

// Create storage engine
const storage = new GridFsStorage({
  url: URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          reject(err)
        }
        const filename = buf.toString('hex') + path.extname(file.originalname)
        const fileInfo = {
          filename,
          bucketName: 'uploads'
        }
        resolve(fileInfo)
      })
    })
  }
})

const upload = multer({ storage })

module.exports = upload
