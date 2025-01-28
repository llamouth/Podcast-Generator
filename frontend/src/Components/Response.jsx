import React, { useState } from "react";
import { ElevenLabsClient, play } from "elevenlabs";

const ResponseWithTTS = ({ responseData }) => {
    const [loading, setLoading] = useState(false);
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playResponse = async () => {
        try {
            setLoading(true);
            const voiceId = "JBFqnCBsd6RMkjVDRZzb"; // Replace with the voice ID you're using
            const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

            const combinedText = [
                ...responseData.introduction,
                ...responseData.mainContent,
                ...responseData.conclusion,
            ].join(" ");
            
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY, // API Key from environment variables
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
            setAudio(newAudio); // Set the audio object in state
            newAudio.play(); // Play the audio
            setIsPlaying(true); // Set playing state to true
        } catch (error) {
            console.error("Error playing response:", error);
        } finally {
            setLoading(false);
        }
    };

    const togglePlayPause = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const formatText = (text) => {
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
        formattedText = formattedText.replace(/\*(.*?)\*/g, "<i>$1</i>");
        return formattedText;
    };

    return (
        <div className="w-full max-w-full overflow-y-auto">
            <div>

                <pre
                    dangerouslySetInnerHTML={{
                        __html: responseData.introduction.map(formatText).join("<br/>"),
                    }}
                />

                <pre
                    dangerouslySetInnerHTML={{
                        __html: responseData.mainContent.map(formatText).join("<br/>"),
                    }}
                />

                <pre
                    dangerouslySetInnerHTML={{
                        __html: responseData.conclusion.map(formatText).join("<br/>"),
                    }}
                />

                <button
                    className="bg-blue-500 text-white p-2 mt-4 rounded"
                    onClick={audio ? togglePlayPause : playResponse}
                    disabled={loading}
                >
                    {loading ? "Generating Audio..." : isPlaying ? "Pause Audio" : "Play Audio"}
                </button>
            </div>
        </div>
    );
};

export default ResponseWithTTS;
