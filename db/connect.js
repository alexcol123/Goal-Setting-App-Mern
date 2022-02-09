const mongoose = require('mongoose')

exports.connectDB = (url) => {
  return mongoose.connect(
    url,
    {},
    console.log('Connected to MongoDB Altas__________')
  )
}

