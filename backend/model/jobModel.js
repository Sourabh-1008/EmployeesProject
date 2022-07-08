const mongoose = require('mongoose')

const jobSchema = mongoose.Schema(
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
    salary: {
      type: Number,
      required: [true, 'Please add a salary value'],
    },
    position: {
      type: String,
      required: [true, 'Please add a position value'],
    },
    jobdetails: {
      type: String,
      required: [true, 'Please add a jobdetails value'],
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

module.exports = mongoose.model('jobs', jobSchema)