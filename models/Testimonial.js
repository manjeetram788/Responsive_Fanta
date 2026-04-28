const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please provide testimonial text'],
        maxlength: [500, 'Testimonial cannot exceed 500 characters']
    },
    author: {
        type: String,
        required: [true, 'Please provide author name'],
        trim: true,
        maxlength: [100, 'Author name cannot exceed 100 characters']
    },
    position: {
        type: String,
        default: 'Client',
        maxlength: [100, 'Position cannot exceed 100 characters']
    },
    company: {
        type: String,
        default: '',
        maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    image: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

testimonialSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
