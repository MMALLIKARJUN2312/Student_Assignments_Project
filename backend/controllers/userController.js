const { db } = require('../config/db');

const getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });
        const [users] = await db.query('SELECT * FROM students');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });
        const [result] = await db.query('UPDATE students SET username = ?, email = ? WHERE id = ?', [username, email, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
        res.json({ id, username, email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });
        const [result] = await db.query('DELETE FROM students WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
        res.json({message : 'User deleted successfully'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllUsers, updateUser, deleteUser };
