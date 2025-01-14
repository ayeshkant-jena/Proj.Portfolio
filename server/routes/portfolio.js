const express = require('express');
const Portfolio = require('../models/Portfolio');
const router = express.Router();

// Create or update portfolio
router.post('/', async (req, res) => {
    const { userId, sections } = req.body;
    try {
        let portfolio = await Portfolio.findOne({ userId });
        if (portfolio) {
            portfolio.sections = sections;
            await portfolio.save();
        } else {
            portfolio = new Portfolio({ userId, sections });
            await portfolio.save();
        }
        res.status(200).json(portfolio);
    } catch (err) {
        res.status(500).json({ error: 'Error saving portfolio' });
    }
});

// Get portfolio by user ID
router.get('/:userId', async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ userId: req.params.userId });
        if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });
        res.status(200).json(portfolio);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching portfolio' });
    }
});

module.exports = router;
