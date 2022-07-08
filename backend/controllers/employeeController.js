const asyncHandler = require('express-async-handler')

const Employees = require('../model/employeeModel');
const User = require('../model/userModel');

/*
// @desc Get employee
// @route GET  /api/employee
// @access Private/admin    
*/
const getAll = asyncHandler(async(req,res)=>{
    const employee = await Employees.find()
    res.status(200).json(employee)
})

/*
// @desc Get employee
// @route GET  /api/employee
// @access Private    
*/
const getEmployees = asyncHandler(async(req,res)=>{
    const employee = await Employees.find({user: req.user.id})
    res.status(200).json(employee)
})

/*
// @desc Set employee
// @route  POST /api/employees
// @access Private
*/
const setEmployee = asyncHandler(async(req,res)=>{
    const {name,email,position,education,company} = req.body;

    if(!name ||!email ||!position ||!education ||!company ){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    const employee = await Employees.create({
        name,
        email,
        position,
        education,
        company,
        user: req.user.id,
      })
    res.status(200).json(employee)
})

/*
// @desc Update employee
// @route PUT  /api/employees/:id
// @access Private
*/
const updateEmployee = asyncHandler(async(req,res)=>{
    const employee = await Employees.findById(req.params.id);
    if(!employee){
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
    if(employee.user.toString() != user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedEmployee = await Employees.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
      res.status(200).json(updatedEmployee)
})

/*
// @desc Delete employee
// @route Delete /api/employees/:id
// @access Private
*/
const deleteEmployee = asyncHandler(async(req,res)=>{
    const employee = await Employees.findById(req.params.id);
    if(!employee){
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
   if(employee.user.toString() != user.id){
       res.status(401)
       throw new Error('User not authorized')
   }
    await employee.remove()
    res.status(200).json({id: req.params.id})
})



module.exports = {
    getEmployees,
    setEmployee,
    updateEmployee,
    deleteEmployee,
    getAll,
}