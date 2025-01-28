const express = require('express');
const elevenLabs = express.Router();
const { getTextToSpeechAudio } = require('../queries/elevenLabs.query');

elevenLabs.post('/', async (req, res) => {
    try {
        const audioUrl = await getTextToSpeechAudio(req.body);
        if (audioUrl) {
            return res.status(200).json({ audioUrl }); // Send the audio URL back to the frontend
        } else {
            return res.status(500).json({ error: 'Failed to generate audio' });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error });
    }
})

module.exports = elevenLabs;