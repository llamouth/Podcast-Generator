const express = require('express');
const cors = require("cors")
const app = express();
const geminiController = require('./controllers/gemini.controller');
const elevenLabController = require('./controllers/elevenLabs.controller');

app.use(express.json())
app.use(cors())
app.use('/gemini', geminiController);
app.use('/elevenlab', elevenLabController);

app.get("/", (req, res) => {
    res.json("Welcome Podcast Generator!")
})

app.get("*", (req, res) => {
    res.status(404).send("Page not found")
})

module.exports = app;