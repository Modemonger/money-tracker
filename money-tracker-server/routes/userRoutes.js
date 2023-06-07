const express = require('express');
const router = express.Router();
const { 
    registerUser,
    getUser,
    loginUser,
    deleteUser,
 } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.get('/get-user', protect, getUser);
router.delete('/delete-user/:id', protect, deleteUser);

module.exports = router;