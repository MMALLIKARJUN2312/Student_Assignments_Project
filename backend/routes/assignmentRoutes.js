const express = require('express');
const {
    createAssignment,
    getAssignments,
    updateAssignment,
    deleteAssignment,
    submitAssignment,
    gradeAssignment
} = require('../controllers/assignmentController');
const { authenticateJWT, authorizeAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/assignments', authenticateJWT, authorizeAdmin, createAssignment);
router.get('/assignments/all', authenticateJWT, getAssignments);
router.put('/assignments/:id', authenticateJWT, authorizeAdmin, updateAssignment);
router.delete('/assignments/:id', authenticateJWT, authorizeAdmin, deleteAssignment);
router.post('/assignments/:assignment_id/:student_id/submit', authenticateJWT, submitAssignment);
router.post('/submissions/:id/grade', authenticateJWT, authorizeAdmin, gradeAssignment);

module.exports = router;
