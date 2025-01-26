import React, { useState } from 'react'
import Form from './Form'
import Response from './Response';

const Container = () => {

    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState([]);

    return (
        <div className='container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center max-h-screen h-screen overflow-auto'>
            <h1 className='text-4xl font-bold mb-4'>Cast-A-Pod</h1>
            {loading ? 
                <div className="spinner">Loading...</div>
            :
                <>
                    <p className='text-xl mb-6 text-center'>Welcome to Cast-A-Pod! This is a podcast episode generator that uses Google's Gemini AI to generate podcast scripts based on your topic and preferences. Simply fill out the form below and click "Generate" to get started!</p>
                    <div className='w-full '>
                        <Form setLoading={setLoading} setResponseData={setResponseData}/>
                    </div>
                    {responseData.length > 0 &&
                        <>
                            <h2 className="text-2xl font-bold mb-4">Generated Podcast Script</h2>
                            <Response responseData={responseData}/>
                        </>
                    }
                </>
            }
        </div>
    )
}

export default Container
