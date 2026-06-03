const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (user) => {
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    }
    const token =  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5days' });
    return token;
};

module.exports = generateToken;