require("dotenv").config();
const { ElevenLabsClient } = require('elevenlabs');

const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });

const getTextToSpeechAudio = async (responseObject) => {
    try {
        const voiceId = "JBFqnCBsd6RMkjVDRZzb"; // Your specific voice ID

        // Combine the text from the responseObject
        const combinedText = [
            ...responseObject?.introduction,
            ...responseObject?.mainContent,
            ...responseObject?.conclusion,
        ].join(" ");

       
        // Call the Eleven Labs API to generate the audio
        const audioResponse = await client.generate({
            voiceId: voiceId,
            text: combinedText,
            modelId: 'eleven_multilingual_v2', // Or your specific model ID
            outputFormat: 'mp3' // Specify the desired output format
        });
 
        return audioResponse; // The response should contain the audio data in the specified format
    } catch (error) {
        console.error("Error getting TTS audio:", error);
        throw error; // Propagate the error for the controller to handle
    }
}

module.exports = {
    getTextToSpeechAudio
}
