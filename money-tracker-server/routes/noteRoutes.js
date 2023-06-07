const express = require('express');
const router = express.Router();
const { 
    getNotes,
    setNote,
    updateNote,
    deleteNote,
    getUserTotal
 } = require('../controllers/noteController');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getNotes).post(protect, setNote).put(protect, updateNote).delete(protect, deleteNote);
router.route('/total').get(protect, getUserTotal);

module.exports = router;