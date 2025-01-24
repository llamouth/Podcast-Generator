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

    let { title, commentators, length, description} = promptObj

    const newPrompt = `Please structure a podcast episode for the topic "${title}" with the description "${description}". The episode should be NO LONGER THAN ${length} minutes long and involve ${commentators} commentators. Briefly outline the commentators’ backgrounds or expertise if applicable. The structure should include:
    - **Introduction**: Provide a brief overview of the topic and introduce the commentators, including their names and roles.
    - **Main Content**: Dive into key points, discussions, or debates related to the topic. Each commentator should have a chance to share their perspective or insights.
    - **Conclusion**: Summarize the episode, key takeaways, and any closing remarks.
    
    Keep the discussion focused ENTIRELY on "${title}".`;

    const result = await model.generateContent(newPrompt);

    return formatPodcastResponse(result.response.text());
};

module.exports = { getGeminiTextResponse };