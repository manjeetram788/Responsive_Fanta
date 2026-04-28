const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Feature = require('../models/Feature');

// Validation middleware
const validateFeature = [
    body('title')
        .trim()
        .notEmpty().withMessage('Feature title is required')
        .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 5, max: 500 }).withMessage('Description must be between 5 and 500 characters'),
    body('number')
        .isInt({ min: 1, max: 99 }).withMessage('Feature number must be between 1 and 99')
];

// POST: Create feature
router.post('/', validateFeature, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const feature = new Feature({
            title: req.body.title,
            description: req.body.description,
            number: req.body.number,
            icon: req.body.icon || '✨'
        });

        await feature.save();
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

// GET: Get all active features
router.get('/', async (req, res) => {
    try {
        const features = await Feature.find({ isActive: true }).sort({ number: 1 });
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

// GET: Get all features (admin)
router.get('/admin/all', async (req, res) => {
    try {
        const features = await Feature.find().sort({ number: 1 });
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

// GET: Get single feature
router.get('/:id', async (req, res) => {
    try {
        const feature = await Feature.findById(req.params.id);
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

// PUT: Update feature
router.put('/:id', validateFeature, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const feature = await Feature.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Feature updated successfully',
            data: feature
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating feature',
            error: error.message
        });
    }
});

// DELETE: Delete feature
router.delete('/:id', async (req, res) => {
    try {
        await Feature.findByIdAndDelete(req.params.id);
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

module.exports = router;
