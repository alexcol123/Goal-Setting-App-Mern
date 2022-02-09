require('dotenv').config()

const { connectDB } = require('./db/connect')
const Goal = require('./models/goal')

const jsonGoals = require('./goal.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Goal.deleteMany()
    await Goal.create(jsonGoals)

    console.log('Items Added to Database...........')
    // Exit - if successfull
    process.exit(0)
  } catch (error) {
    // will show error if any
    console.log(error)
    // Exit - if Error
    process.exit(1)
  }
}

start()

// TO run just run command:  node  populate
