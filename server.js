require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Initialize Express
const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'FrontEnd')));

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✓ MongoDB Connected Successfully'))
.catch(err => console.error('✗ MongoDB Connection Error:', err.message));

// Routes
app.use('/api/v1/contact', require('./routes/contactRoutes'));
app.use('/api/v1/services', require('./routes/servicesRoutes'));
app.use('/api/v1/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/v1/features', require('./routes/featureRoutes'));

// Health Check
app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'FrontEnd', 'index.html'));
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        status: err.status || 500
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 API Base URL: http://localhost:${PORT}/api/v1\n`);
});

module.exports = app;
