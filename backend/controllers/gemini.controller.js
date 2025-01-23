const express = require('express');
const geminiRouter = express.Router( );
const { getGeminiTextResponse } = require('../queries/gemini.query');

geminiRouter.post('/', async (req, res) => {
    const { prompt } = req.body;
    try {
        const data = await getGeminiTextResponse(prompt);
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

module.exports = geminiRouter;