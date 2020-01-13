const mongoose = require('mongoose')
const config = require('config')
const URI = config.get('mongoURI')

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log('MongoDB connected...')
  } catch (error) {
    console.error(error.message)
    // Exit process with a failure
    process.exit(1)
  }
}

module.exports = connectDB
