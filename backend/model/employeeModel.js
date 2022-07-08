const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema(
  {
    user :{
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref: 'User'
    },
    name: {
      type: String,
      required: [true, 'Please add a name value'],
    },
    email: {
      type: String,
      required: [true, 'Please add a email value'],
    },
    position: {
      type: String,
      required: [true, 'Please add a position value'],
    },
    education: {
      type: String,
      required: [true, 'Please add a education value'],
    },
    company: {
      type: String,
      required: [true, 'Please add a company value'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Employees', employeeSchema)