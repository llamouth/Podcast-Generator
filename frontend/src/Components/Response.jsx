import React, { useEffect, useState } from 'react';

const Response = ({ responseData }) => {
    const [displayedData, setDisplayedData] = useState([]);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < responseData.length) {
                setDisplayedData(prev => [...prev, responseData[index]]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [responseData]);

    return (
        <div className="w-full max-w-full overflow-y-auto">
            <div className="response-container bg-gray-100 p-4 ">
                {displayedData.map((data, idx) => (
                    <pre key={idx} className="whitespace-pre-wrap">{data}</pre>
                ))}
            </div>
        </div>
    );
};

export default Response;
