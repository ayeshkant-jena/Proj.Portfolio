const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});

const PortfolioSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sections: [SectionSchema], // Array of sections
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
