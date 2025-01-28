

const getTextToSpeechAudio = async (responseObject) => {
    try {
        const voiceId = "JBFqnCBsd6RMkjVDRZzb"; // Replace with the voice ID you're using
        const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

        const combinedText = [
            ...responseObject.introduction,
            ...responseObject.mainContent,
            ...responseObject.conclusion,
        ].join(" ");

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "xi-api-key": process.env.ELEVENLABS_API_KEY, // API Key from environment variables
            },
            body: JSON.stringify({
                text: combinedText, // Replace with dynamic text
                model_id: "eleven_multilingual_v2", // Replace with the correct model ID if needed
                output_format: "mp3_44100_128",
            }),
        });
    
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }
    
        const audioBlob = await response.blob(); // Retrieve the audio as a Blob
        const audioUrl = URL.createObjectURL(audioBlob); // Convert Blob to URL for playback
        const newAudio = new Audio(audioUrl); // Create an audio object
        return newAudio;
    } catch (error) {
        console.error("Error getting TTS audio:", error);
        return error;
    }
}

module.exports = {
    getTextToSpeechAudio
}