require('dotenv').config();
const GOOGLE_API = process.env.GOOGLE_API;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(GOOGLE_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const formatPodcastResponse = (response) => {
    // Split the response by newlines and remove empty lines or excess whitespace
    return response.split("\n").map(line => line.trim()).filter(line => line !== ""); 
};


const getGeminiTextResponse = async (promptObj) => {
    let { topic, numOfCommentators, length} = promptObj

    const newPrompt = `Please structure a podcast episode for the topic "${topic}". The episode should be  NO LONGER THAN ${length} minutes long and involve ${numOfCommentators} commentators. The structure should include:
    - **Introduction**: Provide a brief overview of the topic and introduce the commentators.
    - **Main Content**: Dive into key points, discussions, or debates related to the topic.
    - **Conclusion**: Summarize the episode, key takeaways, and any closing remarks.

    Keep the discussion focused ENTIRELY on "${topic}".`;

    const result = await model.generateContent(newPrompt);

    return formatPodcastResponse(result.response.text());
};

module.exports = { getGeminiTextResponse };