const express = require('express');
const elevenLabs = express.Router();
const { getTextToSpeechAudio } = require('../queries/elevenLabs.query');

elevenLabs.post('/', async (req, res) => {
    try {

        const audioData = await getTextToSpeechAudio(req.body);

        res.setHeader("Content-Type", "audio/mpeg"); // Ensure correct response type
        res.send(Buffer.from(audioData)); // Send binary audio response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = elevenLabs;