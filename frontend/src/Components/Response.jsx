import React from 'react'

const Response = ({responseData}) => {

    
    return (
        <div className="w-full max-w-full overflow-auto">
            <div className="response-container bg-gray-100 p-4 overflow-auto">
                <pre>{responseData}</pre>
            </div>
        </div>
    )
}

export default Response
