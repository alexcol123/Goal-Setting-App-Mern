require('dotenv').config()

// Async Errors
require('express-async-errors')

const express = require('express')
const app = express()

// Connect to Atlas
const { connectDB } = require('./db/connect')

//  Routers
const goalRouter = require('./routes/goal')
const notFoundMiddlewate = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.json())

// routes

app.get('/', (req, res) => {
  res.send(
    '<h1>Store API</h1><a href="/api/v1/goal"> <h3> Goal route  </h3></a>'
  )
})
// Goal routes
app.use('/api/v1/goal', goalRouter)
app.use(notFoundMiddlewate)
app.use(errorMiddleware)

const port = process.env.PORT || 3001

const start = async () => {
  try {
    // Connect DB
    await connectDB(process.env.MONGO_URI)
    // App
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (err) {
    console.log(err)
  }
}

start()
