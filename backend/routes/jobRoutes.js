const express = require('express');
const router = express.Router();
const { getjobsName, setJob, updateJob, deleteJob } = require('../controllers/jobController');

const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getjobsName);
router.post('/',protect,admin,setJob)
router.route('/:id').put(protect,admin,updateJob).delete(protect,admin,deleteJob);

//router.route('/').get(getEmployees).post(setEmployee);
//router.route('/:id').put(updateEmployee).delete(deleteEmployee);
// router.get('/',getGoals)

module.exports = router

// router.get('/',getGoals)
 //router.post('/',protect,admin,setJob)
// router.put('/:id',updateGoal)
// router.delete('/:id',deleteGoal)