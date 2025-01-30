import React, { useState } from 'react'
import Form from './Form'
import Response from './Response';

const Container = () => {
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [utterance, setUtterance] = useState(null);

    const playResponse = () => {
        setLoading(true);
        const combinedText = [
            ...responseData.introduction,
            ...responseData.mainContent,
            ...responseData.conclusion,
        ].join(" ");

        const newUtterance = new SpeechSynthesisUtterance(combinedText);
        newUtterance.onend = () => {
            setIsPlaying(false);
            setLoading(false);
        };
        newUtterance.onerror = (error) => {
            console.error("Speech synthesis error:", error);
            setLoading(false);
        };

        window.speechSynthesis.speak(newUtterance);
        setUtterance(newUtterance);
        setIsPlaying(true);
        setLoading(false);
    };

    const togglePlayPause = () => {
        if (utterance) {
            if (isPlaying) {
                window.speechSynthesis.pause();
            } else {
                window.speechSynthesis.resume();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const stopResponse = () => {
        if (utterance) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            setUtterance(null); // Reset the utterance state
        }
    };

    return (
        <div className='container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center max-h-screen h-screen overflow-auto overflow-x-hidden'>
            <h1 className='text-3xl font-bold mb-4 text-center text-gray-800'>Cast-A-Pod</h1>
            {loading ? 
                <div className="spinner">Loading...</div>
            :
                <>
                    <p className='text-lg mb-6 text-center text-gray-700'>Welcome to Cast-A-Pod! This is a podcast episode generator that uses Google's Gemini AI to generate podcast scripts based on your topic and preferences. Simply fill out the form below and click "Generate" to get started!</p>
                    <div className='w-full'>
                        <Form setLoading={setLoading} setResponseData={setResponseData}/>
                    </div>
                    {responseData?.introduction &&
                        <div className='w-full whitespace-pre-wrap break-words mt-6 max-h-10'>
                            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Generated Podcast Script</h2>
                            <div className="flex justify-center mt-4 pb-2">
                                <button
                                    className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2 transition duration-300 ease-in-out text-sm"
                                    onClick={utterance ? togglePlayPause : playResponse}
                                    disabled={loading}
                                >
                                    {loading ? "Generating Audio..." : isPlaying ? "Pause Audio" : "Play Audio"}
                                </button>
                                <button
                                    className="bg-red-600 hover:bg-red-800 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out text-sm"
                                    onClick={stopResponse}
                                    disabled={loading || !isPlaying}
                                >
                                    Stop Audio
                                </button>
                            </div>
                            <div className="w-full h-[325px]">
                                <Response responseData={responseData}/>
                            </div>
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default Container
