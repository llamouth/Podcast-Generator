const { GoogleGenerativeAI } = require("@google/generative-ai");


function App() {

  const test = async () => {
    const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = "Explain how AI works";
    
    const result = await model.generateContent(prompt);
    console.log(result.response.text());

  }

  test()

  return (
    <>

    </>
  )
}

export default App
