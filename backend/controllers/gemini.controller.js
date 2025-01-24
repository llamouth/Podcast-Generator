const express = require('express');
const geminiRouter = express.Router( );
const { getGeminiTextResponse } = require('../queries/gemini.query');

geminiRouter.post('/', async (req, res) => {
    try {
        const data = await getGeminiTextResponse(req.body);
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

module.exports = geminiRouter;