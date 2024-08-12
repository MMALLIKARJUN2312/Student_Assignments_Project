const db = require('../config/db').db;

async function createUser(username, email, password, role) {
    try {
        const [result] = await db.execute(
            'INSERT INTO students (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, password, role]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

async function getUserByUsername(username) {
    try {
        const [rows] = await db.execute('SELECT * FROM students WHERE username = ?', [username]);
        return rows[0];
    } catch (error) {
        console.error('Error retrieving user:', error);
        throw error;
    }
}

async function updateUser(username, email, password) {
    try {
        await db.execute(
            'UPDATE students SET password = ?, email = ? WHERE username = ?',
            [password, email, username]
        );
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

async function deleteUser(username) {
    try {
        await db.execute('DELETE FROM students WHERE username = ?', [username]);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

module.exports = { createUser, getUserByUsername, updateUser, deleteUser };
