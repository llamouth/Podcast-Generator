import React from 'react'
import Form from './Form'

const Container = () => {
    return (
        <div className='container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center'>
            <h1 className='text-4xl font-bold mb-4'>Cast-A-Pod</h1>
            <p className='text-xl mb-6 text-center'>Welcome to Cast-A-Pod! This is a podcast episode generator that uses Google's Gemini AI to generate podcast scripts based on your topic and preferences. Simply fill out the form below and click "Generate" to get started!</p>
            <div className='w-full max-w-lg'>
                <Form />
            </div>
        </div>
    )
}

export default Container
