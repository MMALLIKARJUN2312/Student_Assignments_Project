const db = require('../config/db').db;

async function createAssignment(title, description, due_date, creator_id) {
    try {
        const [result] = await db.execute(
            'INSERT INTO assignments (title, description, due_date, creator_id) VALUES (?, ?, ?, ?)',
            [title, description, due_date, creator_id]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating assignment:', error);
        throw error;
    }
}

async function getAssignments(filterBy = '', sortBy = 'due_date') {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM assignments WHERE title LIKE ? ORDER BY ??',
            [`%${filterBy}%`, sortBy]
        );
        return rows;
    } catch (error) {
        console.error('Error retrieving assignments:', error);
        throw error;
    }
}

async function updateAssignment(id, title, description, due_date) {
    try {
        await db.execute(
            'UPDATE assignments SET title = ?, description = ?, due_date = ? WHERE id = ?',
            [title, description, due_date, id]
        );
    } catch (error) {
        console.error('Error updating assignment:', error);
        throw error;
    }
}

async function deleteAssignment(id) {
    try {
        await db.execute('DELETE FROM assignments WHERE id = ?', [id]);
    } catch (error) {
        console.error('Error deleting assignment:', error);
        throw error;
    }
}

module.exports = { createAssignment, getAssignments, updateAssignment, deleteAssignment };
