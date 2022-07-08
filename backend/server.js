const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 4000;
const colors = require('colors');
const cors = require('cors');

//Database connection 
const connectDB = require('./config/db');

//Call Function of database 
connectDB()

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(errorHandler)
app.use(cors())

app.use('/api/jobs',require('./routes/jobRoutes'))
app.use('/api/employees',require('./routes/employeesRoutes'))
app.use('/api/users',require('./routes/userRoutes'))

app.listen(port,()=>{
    console.log(`Server Started on port ${port}`);
})
