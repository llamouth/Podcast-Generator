import React from "react";

const ResponseWithTTS = ({ responseData }) => {
    const formatText = (text) => {
        // Remove text within parentheses
        let formattedText = text.replace(/\(.*?\)/g, "");
        // Apply bold and italic formatting
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
        formattedText = formattedText.replace(/\*(.*?)\*/g, "<i>$1</i>");
        return formattedText;
    };

    return (
        <div className="w-full max-w-full overflow-y-auto overflow-x-hidden p-4 bg-white shadow-lg rounded-lg max-h-full">
            <div className="whitespace-pre-wrap break-words">
                <pre
                    style={{ whiteSpace: 'pre-wrap' }}
                    dangerouslySetInnerHTML={{
                        __html: responseData.introduction.map(formatText).join("<br/>"),
                    }}
                    className="mb-2 text-gray-800 text-sm"
                />
                <pre
                    style={{ whiteSpace: 'pre-wrap' }}
                    dangerouslySetInnerHTML={{
                        __html: responseData.mainContent.map(formatText).join("<br/>"),
                    }}
                    className="mb-2 text-gray-800 text-sm"
                />
                <pre
                    style={{ whiteSpace: 'pre-wrap' }}
                    dangerouslySetInnerHTML={{
                        __html: responseData.conclusion.map(formatText).join("<br/>"),
                    }}
                    className="mb-2 text-gray-800 text-sm"
                />
            </div>
        </div>
    );
};

export default ResponseWithTTS;