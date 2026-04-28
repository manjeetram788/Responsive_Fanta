require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Initialize Express
const app = express();

// Middleware
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'FrontEnd')));

// Data directory
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Helper functions for file operations
const readData = (file) => {
    try {
        const filePath = path.join(dataDir, `${file}.json`);
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
        return [];
    } catch (error) {
        return [];
    }
};

const writeData = (file, data) => {
    try {
        const filePath = path.join(dataDir, `${file}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing data:', error);
        return false;
    }
};

const generateId = () => Math.random().toString(36).substr(2, 9);

// ===== CONTACT ROUTES =====
app.post('/api/v1/contact', (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const contact = {
            id: generateId(),
            name,
            email,
            subject: subject || 'No Subject',
            message,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const contacts = readData('contacts');
        contacts.push(contact);
        writeData('contacts', contacts);

        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error sending message',
            error: error.message
        });
    }
});

app.get('/api/v1/contact', (req, res) => {
    try {
        const contacts = readData('contacts');
        res.json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching contacts',
            error: error.message
        });
    }
});

app.get('/api/v1/contact/:id', (req, res) => {
    try {
        const contacts = readData('contacts');
        const contact = contacts.find(c => c.id === req.params.id);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching contact',
            error: error.message
        });
    }
});

app.put('/api/v1/contact/:id', (req, res) => {
    try {
        let contacts = readData('contacts');
        const index = contacts.findIndex(c => c.id === req.params.id);

        if (index === -1) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        contacts[index] = {
            ...contacts[index],
            status: req.body.status || contacts[index].status,
            response: req.body.response || contacts[index].response,
            updatedAt: new Date().toISOString()
        };

        writeData('contacts', contacts);
        res.json({
            success: true,
            message: 'Contact updated successfully',
            data: contacts[index]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating contact',
            error: error.message
        });
    }
});

app.delete('/api/v1/contact/:id', (req, res) => {
    try {
        let contacts = readData('contacts');
        contacts = contacts.filter(c => c.id !== req.params.id);
        writeData('contacts', contacts);

        res.json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting contact',
            error: error.message
        });
    }
});

// ===== SERVICES ROUTES =====
app.post('/api/v1/services', (req, res) => {
    try {
        const { title, description, icon } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const service = {
            id: generateId(),
            title,
            description,
            icon: icon || '🎨',
            price: req.body.price || 0,
            duration: req.body.duration || 'Contact us',
            features: req.body.features || [],
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const services = readData('services');
        services.push(service);
        writeData('services', services);

        res.status(201).json({
            success: true,
            message: 'Service created successfully',
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating service',
            error: error.message
        });
    }
});

app.get('/api/v1/services', (req, res) => {
    try {
        const services = readData('services').filter(s => s.isActive !== false);
        res.json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching services',
            error: error.message
        });
    }
});

app.get('/api/v1/services/:id', (req, res) => {
    try {
        const services = readData('services');
        const service = services.find(s => s.id === req.params.id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching service',
            error: error.message
        });
    }
});

app.put('/api/v1/services/:id', (req, res) => {
    try {
        let services = readData('services');
        const index = services.findIndex(s => s.id === req.params.id);

        if (index === -1) {
            return res.status(404).json({ message: 'Service not found' });
        }

        services[index] = {
            ...services[index],
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        writeData('services', services);
        res.json({
            success: true,
            message: 'Service updated successfully',
            data: services[index]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating service',
            error: error.message
        });
    }
});

app.delete('/api/v1/services/:id', (req, res) => {
    try {
        let services = readData('services');
        services = services.filter(s => s.id !== req.params.id);
        writeData('services', services);

        res.json({
            success: true,
            message: 'Service deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting service',
            error: error.message
        });
    }
});

// ===== TESTIMONIALS ROUTES =====
app.post('/api/v1/testimonials', (req, res) => {
    try {
        const { text, author, position, company, rating } = req.body;

        if (!text || !author) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const testimonial = {
            id: generateId(),
            text,
            author,
            position: position || 'Client',
            company: company || '',
            rating: rating || 5,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const testimonials = readData('testimonials');
        testimonials.push(testimonial);
        writeData('testimonials', testimonials);

        res.status(201).json({
            success: true,
            message: 'Testimonial created successfully',
            data: testimonial
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating testimonial',
            error: error.message
        });
    }
});

app.get('/api/v1/testimonials', (req, res) => {
    try {
        const testimonials = readData('testimonials').filter(t => t.isActive !== false);
        res.json({
            success: true,
            count: testimonials.length,
            data: testimonials
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching testimonials',
            error: error.message
        });
    }
});

app.get('/api/v1/testimonials/:id', (req, res) => {
    try {
        const testimonials = readData('testimonials');
        const testimonial = testimonials.find(t => t.id === req.params.id);

        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        res.json({ success: true, data: testimonial });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching testimonial',
            error: error.message
        });
    }
});

app.put('/api/v1/testimonials/:id', (req, res) => {
    try {
        let testimonials = readData('testimonials');
        const index = testimonials.findIndex(t => t.id === req.params.id);

        if (index === -1) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        testimonials[index] = {
            ...testimonials[index],
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        writeData('testimonials', testimonials);
        res.json({
            success: true,
            message: 'Testimonial updated successfully',
            data: testimonials[index]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating testimonial',
            error: error.message
        });
    }
});

app.delete('/api/v1/testimonials/:id', (req, res) => {
    try {
        let testimonials = readData('testimonials');
        testimonials = testimonials.filter(t => t.id !== req.params.id);
        writeData('testimonials', testimonials);

        res.json({
            success: true,
            message: 'Testimonial deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting testimonial',
            error: error.message
        });
    }
});

// ===== FEATURES ROUTES =====
app.post('/api/v1/features', (req, res) => {
    try {
        const { title, description, number } = req.body;

        if (!title || !description || !number) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const feature = {
            id: generateId(),
            title,
            description,
            number,
            icon: req.body.icon || '✨',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const features = readData('features');
        features.push(feature);
        writeData('features', features);

        res.status(201).json({
            success: true,
            message: 'Feature created successfully',
            data: feature
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating feature',
            error: error.message
        });
    }
});

app.get('/api/v1/features', (req, res) => {
    try {
        const features = readData('features').filter(f => f.isActive !== false);
        res.json({
            success: true,
            count: features.length,
            data: features
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching features',
            error: error.message
        });
    }
});

app.get('/api/v1/features/:id', (req, res) => {
    try {
        const features = readData('features');
        const feature = features.find(f => f.id === req.params.id);

        if (!feature) {
            return res.status(404).json({ message: 'Feature not found' });
        }

        res.json({ success: true, data: feature });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching feature',
            error: error.message
        });
    }
});

app.put('/api/v1/features/:id', (req, res) => {
    try {
        let features = readData('features');
        const index = features.findIndex(f => f.id === req.params.id);

        if (index === -1) {
            return res.status(404).json({ message: 'Feature not found' });
        }

        features[index] = {
            ...features[index],
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        writeData('features', features);
        res.json({
            success: true,
            message: 'Feature updated successfully',
            data: features[index]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating feature',
            error: error.message
        });
    }
});

app.delete('/api/v1/features/:id', (req, res) => {
    try {
        let features = readData('features');
        features = features.filter(f => f.id !== req.params.id);
        writeData('features', features);

        res.json({
            success: true,
            message: 'Feature deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting feature',
            error: error.message
        });
    }
});

// ===== Health Check =====
app.get('/api/v1/health', (req, res) => {
    res.json({
        status: 'Server is running',
        timestamp: new Date(),
        storage: 'File-based (JSON)'
    });
});

// ===== Serve Frontend =====
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
    console.log(`\n✅ LOCAL SERVER RUNNING (File-based storage)`);
    console.log(`🌍 http://localhost:${PORT}`);
    console.log(`📧 API: http://localhost:${PORT}/api/v1`);
    console.log(`💾 Data stored in: ${dataDir}\n`);
});
