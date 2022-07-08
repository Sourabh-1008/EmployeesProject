const express = require('express');
const router = express.Router();
const { getEmployees, setEmployee, updateEmployee, deleteEmployee,getAll } = require('../controllers/employeeController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect,getEmployees).post(protect,setEmployee);
router.route('/:id').put(protect,updateEmployee).delete(protect,deleteEmployee);
router.get('/getAll',getAll);
//router.route('/').get(getEmployees).post(setEmployee);
//router.route('/:id').put(updateEmployee).delete(deleteEmployee);


module.exports = router


// router.post('/',setGoal)
// router.put('/:id',updateGoal)
// router.delete('/:id',deleteGoal)