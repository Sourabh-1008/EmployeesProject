const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    getMe,
    getUserAll,
} = require('../controllers/userController');

const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me',protect,admin, getMe);
router.get('/userlist',getUserAll)


module.exports = router