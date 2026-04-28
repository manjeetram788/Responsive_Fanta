const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a feature title'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide a feature description'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    number: {
        type: Number,
        required: [true, 'Please provide a feature number'],
        min: 1,
        max: 99
    },
    icon: {
        type: String,
        default: '✨'
    },
    isActive: {
        type: Boolean,
        default: true
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

featureSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Feature', featureSchema);
