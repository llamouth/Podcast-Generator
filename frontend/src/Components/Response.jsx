import React, { useState } from "react";

const ResponseWithTTS = ({ responseData }) => {
    const [loading, setLoading] = useState(false);
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const API = import.meta.env.VITE_BASE_API_URL; 

    // Function to handle playing the TTS response
    const playResponse = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API}/elevenlab`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(responseData),
            });

            if (!response.ok) {
                throw new Error('Failed to generate audio');
            }

            const audioBlob = await response.blob(); // Await the blob conversion
            const audioUrl = URL.createObjectURL(audioBlob); // Create a URL for the Blob

            const newAudio = new Audio(audioUrl);
            await newAudio.play(); // Play audio immediately or await it

            setAudio(newAudio); // Set the new audio object
            setIsPlaying(true); // Set playing state to true
        } catch (error) {
            console.error("Error in playResponse:", error);
        } finally {
            setLoading(false);
        }
    };

    // Function to toggle play/pause for the audio
    const togglePlayPause = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play().catch((err) => {
                    console.error('Error while trying to play the audio:', err);
                });
            }
            setIsPlaying(!isPlaying); // Toggle the playing state
        }
    };

    // Function to format text with Markdown-like syntax
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