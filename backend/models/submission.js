const db = require('../config/db').db;

async function submitAssignment(assignment_id, student_id, submission_date) {
    try {
        const [result] = await db.execute(
            'INSERT INTO submissions (assignment_id, student_id, submission_date) VALUES (?, ?, ?)',
            [assignment_id, student_id, submission_date]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error submitting assignment:', error);
        throw error;
    }
}

async function gradeAssignment(id, grade) {
    try {
        await db.execute(
            'UPDATE submissions SET grade = ? WHERE id = ?',
            [grade, id]
        );
    } catch (error) {
        console.error('Error grading assignment:', error);
        throw error;
    }
}

module.exports = { submitAssignment, gradeAssignment };
