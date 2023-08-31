const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.createUser(username, hashedPassword);
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.getUserByUsername(username);
    if (!user) throw new Error('User not found');
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error('Invalid password');
    
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
