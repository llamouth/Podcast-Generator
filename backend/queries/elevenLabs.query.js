require("dotenv").config();
const fetch = require("node-fetch"); // Ensure this is installed if using CommonJS

const getTextToSpeechAudio = async (responseObject) => {
    try {
        const voiceId = "JBFqnCBsd6RMkjVDRZzb"; // Ensure this is your actual ElevenLabs voice ID

        // Combine all text into one string
        const combinedText = [
            ...responseObject?.introduction || [],
            ...responseObject?.mainContent || [],
            ...responseObject?.conclusion || [],
        ].join(" ");

        console.log("Requesting audio for text:", combinedText); // Debugging log

        // API request to ElevenLabs
        const audioResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "xi-api-key": process.env.ELEVENLABS_API_KEY, // Ensure this is set correctly
            },
            body: JSON.stringify({
                text: combinedText,
                model_id: "eleven_multilingual_v2", // Correct field name
                output_format: "mp3", // Correct field name
            }),
        });

        if (!audioResponse.ok) {
            const errorDetails = await audioResponse.json();
            console.error("ElevenLabs API Error:", errorDetails);
            throw new Error(`API Error: ${audioResponse.status} - ${errorDetails.message}`);
        }

        return await audioResponse.arrayBuffer(); // Return raw binary audio data
    } catch (error) {
        console.error("Error getting TTS audio:", error);
        throw error;
    }
};

module.exports = {
    getTextToSpeechAudio,
};
