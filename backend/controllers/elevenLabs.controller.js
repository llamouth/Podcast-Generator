const express = require('express');
const elevenLabs = express.Router();
const { getTextToSpeechAudio } = require('../queries/elevenLabs.query');

elevenLabs.post('/', async (req, res) => {
    try {
        
        const audioData = await getTextToSpeechAudio(req.body);
        res.setHeader('Content-Type', 'audio/mpeg'); // Set this according to the actual audio type
        res.setHeader('Content-Disposition', 'attachment; filename="output.mp3"'); // Optional for downloads

        const audioBuffer = Buffer.from(audioData, 'binary'); // Convert to Buffer if needed
        return res.status(200).send(audioBuffer); // Send the audio data, ensure it's in the correct format
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = elevenLabs;