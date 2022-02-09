const mongoose = require('mongoose')

// Declare the Schema of the Mongo model
const goalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Goal text  must be provided'],
    },
    goalType: {
      type: String,
      enum: {
        values: ['fitness', 'educational', 'personal', 'financial'],
      },
    },
    completed: {
      type: Boolean,
      default: false,
    },
    deadlineInDays: {
      type: Number,
      required: [true, 'Deadline in Days    must be provided'],
    },
    percentageCompleted: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

//Export the model
module.exports = mongoose.model('Goal', goalSchema)
