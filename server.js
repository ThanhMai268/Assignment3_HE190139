const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// Router
const routes = require('./routes/apiRoute');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Connect to MongoDB
const startServer = async () => {
    await connectDB();

    app.get('/', async (req, res) => {
        try {
            res.send({ message: 'Welcome to Practical Exam!' });
        } catch (error) {
            res.send({ error: error.message });
        }
    });

    const PORT = process.env.PORT || 9999;
    app.listen(PORT, () => console.log(`Server running on port https://localhost:${PORT}`));
};

startServer();
