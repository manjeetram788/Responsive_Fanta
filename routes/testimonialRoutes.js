const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Testimonial = require('../models/Testimonial');

// Validation middleware
const validateTestimonial = [
    body('text')
        .trim()
        .notEmpty().withMessage('Testimonial text is required')
        .isLength({ min: 10, max: 500 }).withMessage('Text must be between 10 and 500 characters'),
    body('author')
        .trim()
        .notEmpty().withMessage('Author name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Author name must be between 2 and 100 characters'),
    body('rating')
        .optional()
        .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
];

// POST: Create testimonial
router.post('/', validateTestimonial, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const testimonial = new Testimonial({
            text: req.body.text,
            author: req.body.author,
            position: req.body.position || 'Client',
            company: req.body.company || '',
            rating: req.body.rating || 5,
            image: req.body.image || null
        });

        await testimonial.save();
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

// GET: Get all active testimonials
router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1 });
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

// GET: Get all testimonials (admin)
router.get('/admin/all', async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ order: 1 });
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

// GET: Get single testimonial
router.get('/:id', async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
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

// PUT: Update testimonial
router.put('/:id', validateTestimonial, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Testimonial updated successfully',
            data: testimonial
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating testimonial',
            error: error.message
        });
    }
});

// DELETE: Delete testimonial
router.delete('/:id', async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
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

module.exports = router;
