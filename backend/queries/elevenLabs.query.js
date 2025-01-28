require("dotenv").config()

const getTextToSpeechAudio = async (responseObject) => {
    try {
        const voiceId = "JBFqnCBsd6RMkjVDRZzb"; // Replace with the voice ID you're using
        const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

        // Combine all parts of the response text
        const combinedText = [
            ...responseObject?.introduction,
            ...responseObject?.mainContent,
            ...responseObject?.conclusion,
        ].join(" ");

        // Make the POST request to the Eleven Labs API
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "xi-api-key": process.env.ELEVENLABS_API_KEY, // Ensure this is set correctly in your environment
            },
            body: JSON.stringify({
                text: combinedText, // The dynamic text to convert to speech
                model_id: "eleven_multilingual_v2", // Replace with the correct model ID if needed
                output_format: "mp3_44100_128", // Audio format settings
            }),
        });

        console.log(response);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        // Retrieve the audio data as a Blob
        const audioBlob = await response.blob();
        
        // Create an audio URL for the Blob
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Return the audio URL instead of the Blob for easier use in the calling function
        return audioUrl;
    } catch (error) {
        console.error("Error getting TTS audio:", error);
        return null; // Returning null in case of error for better handling downstream
    }
}

module.exports = {
    getTextToSpeechAudio
}
