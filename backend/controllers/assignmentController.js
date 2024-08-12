const { sendEmail } = require('../config/email')
const { db, redisClient } = require('../config/db');

const createAssignment = async (req, res) => {
    const { title, description, due_date, creator_id } = req.body;
    const formattedDueDate = new Date(due_date).toISOString().slice(0, 19).replace('T', ' ');

    try {
        const [result] = await db.query(
            'INSERT INTO assignments (title, description, due_date, creator_id) VALUES (?, ?, ?, ?)',
            [title, description, formattedDueDate, creator_id]
        );

        await redisClient.del('assignments');

       const [students] = await db.query('SELECT email FROM students WHERE role = "student"');

       const emails = students.map(student => student.email);
       await Promise.all(emails.map(email => 
           sendEmail(email, 'New Assignment Created', `A new assignment "${title}" has been created. Due date: ${formattedDueDate}`)
       ));

       res.status(201).json({
           id: result.insertId, title, description, due_date: formattedDueDate, creator_id});
   } catch (error) {
       console.error('Error creating assignment or sending email:', error);
       res.status(500).json({ error: 'Error creating assignment or sending email' });
   }
};


const getAssignments = async (req, res) => {
    try {
        const cachedAssignments = await redisClient.get('assignments');
        
        if (cachedAssignments) {
            return res.status(200).json(JSON.parse(cachedAssignments));
        }
        
        const [assignments] = await db.query('SELECT * FROM assignments');
        
        await redisClient.set('assignments', JSON.stringify(assignments));
        
        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ error: error.message });
    }
};

const updateAssignment = async (req, res) => {
    const { id } = req.params;
    const { title, description, due_date } = req.body;

    if (req.user.role !== 'teacher') {
        return res.status(403).json({ message: 'Access denied' });
    }

    let formattedDueDate;
    try {
        const dateObject = new Date(due_date);
        if (isNaN(dateObject.getTime())) {
            throw new Error('Invalid date format');
        }

        formattedDueDate = dateObject.toISOString().slice(0, 19).replace('T', ' ');
    } catch (error) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    try {
        const [result] = await db.query(
            'UPDATE Assignments SET title = ?, description = ?, due_date = ? WHERE id = ?',
            [title, description, formattedDueDate, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        res.json({ message: 'Assignment updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteAssignment = async (req, res) => {
    const { id } = req.params;
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });
        const [result] = await db.query('DELETE FROM Assignments WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Assignment not found' });
        redisClient.del('assignments');
        res.status(201).json({message : "Assignment deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const submitAssignment = async (req, res) => {
    const { assignment_id, student_id } = req.params;
    let { submission_date } = req.body;

    if (submission_date) {
        submission_date = submission_date.replace('T', ' ').replace('Z', '');
        
        if (isNaN(Date.parse(submission_date))) {
            return res.status(400).json({ error: 'Invalid date format' });
        }
    } else {
        return res.status(400).json({ error: 'Submission date is required' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO Submissions (assignment_id, student_id, submission_date) VALUES (?, ?, ?)',
            [assignment_id, student_id, submission_date]
        );

        res.status(201).json({
            id: result.insertId, assignment_id, student_id, submission_date});
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: error.message });
    }
};

const gradeAssignment = async (req, res) => {
    const { id } = req.params;
    const { grade } = req.body;
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });
        const [result] = await db.query('UPDATE Submissions SET grade = ? WHERE id = ?', [grade, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Submission not found' });
        res.json({ id, grade });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createAssignment, getAssignments, updateAssignment, deleteAssignment, submitAssignment, gradeAssignment };
