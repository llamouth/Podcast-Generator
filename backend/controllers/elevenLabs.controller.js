const express = require('express');
const elevenLabs = express.Router();
const { getTextToSpeechAudio } = require('../queries/elevenLabs.query');

elevenLabs.post('/', async (req, res) => {
    try {
        const { responseData } = req.body;
        const audio = await getTextToSpeechAudio(responseData);
        res.status(200).send({ audio });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

module.exports = elevenLabs;