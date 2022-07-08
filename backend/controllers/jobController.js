const asyncHandler = require('express-async-handler')

const jobs = require('../model/jobModel');
const User = require('../model/userModel');
/*
// @desc Get employee
// @route GET  /api/employee
// @access Private    
*/
const getjobsName = asyncHandler(async (req, res) => {
  const job = await jobs.find()
  res.status(200).json(job)
})


// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
// const getjobsName = asyncHandler(async (req, res) => {
//   const job = await jobs.find({
//     "$or":[
//       {name:{$regex:req.params.key}}
//     ]
//   })

//   if (job) {
//     res.json(job)
//   } else {
//     res.status(404)
//     throw new Error('Product not found')
//   }
// })
/*
// @desc Set employee
// @route  POST /api/employees
// @access Private
*/
const setJob = asyncHandler(async (req, res) => {
  const { name, salary, position, jobdetails, company } = req.body;

  if (!name || !salary || !position || !jobdetails || !company) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  const job = await jobs.create({
    name,
    salary,
    position,
    jobdetails,
    company,
    user: req.user.id,
  })
  res.status(200).json(job)
})

/*
// @desc Update employee
// @route PUT  /api/employees/:id
// @access Private
*/
const updateJob = asyncHandler(async(req,res)=>{
    const job = await jobs.findById(req.params.id);
    if(!job){
        res.status(400)
        throw new Error('Employee not found')
    }
   // Check for user
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the employee user
    if(job.user.toString() != user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedJobs = await jobs.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
      res.status(200).json(updatedJobs)
})

/*
// @desc Delete employee
// @route Delete /api/employees/:id
// @access Private
*/
const deleteJob = asyncHandler(async(req,res)=>{
    const job = await jobs.findById(req.params.id);
    if(!job){
        res.status(400)
        throw new Error('employee not found')
    }

//Check for user
   const user = await User.findById(req.user.id)
   if(!user){
       res.status(401)
       throw new Error('User not found')
   }

   //Make sure the logged in user matches the employee user
   if(job.user.toString() != user.id){
       res.status(401)
       throw new Error('User not authorized')
   }
    await job.remove()
    res.status(200).json({id: req.params.id})
})



module.exports = {
  getjobsName,
  setJob,
  updateJob,
  deleteJob,
}