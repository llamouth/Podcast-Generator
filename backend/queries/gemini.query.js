require('dotenv').config();
const GOOGLE_API = process.env.GOOGLE_API;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(GOOGLE_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getGeminiTextResponse = async (promptObj) => {
    let { prompt, numOfCommentators, length} = promptObj

    prompt += `, Please structure the response as a podcast episode with an introduction, main content, and conclusion. This episode should be ${length} minutes long and should include the following amount of commentators ${numOfCommentators}.`;

    const result = await model.generateContentStream(prompt);

    const chunkArr = []
    for await (const chunk of result.stream) {
        console.log(result.stream)
        const chunkText = chunk.text();
        chunkArr.push(chunkText)
    }

    return chunkArr;
};

module.exports = { getGeminiTextResponse };