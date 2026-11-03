const jwt = require('jsonwebtoken');

const members = [
    {
        "email": "HE190139@fpt.edu.vn",
        "password": "he190139@123"
    }
]

const createToken = async (req, res, next) => {
    const { email, password } = req.body || {};
    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const member = members.find(u => u.email === email && u.password === password);
    if (!member) {
        console.log('Login failed');
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    // tao token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login success, ', member.email);
    console.log('JWT created: ');
    return res.json({
        message: 'Login successful',
        accessToken: token
    });
};

module.exports = { createToken };
