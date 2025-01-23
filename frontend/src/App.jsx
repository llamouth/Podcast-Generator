import { GoogleGenerativeAI } from "@google/generative-ai";
import Container from "./Components/Container";
const GOOGLE_API = import.meta.env.VITE_GOOGLE_API;

function App() {

  const test = async () => {
    const genAI = new GoogleGenerativeAI(GOOGLE_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = "Explain how AI works";
    
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  }

  test()

  return (
    <div className='flex justify-center items-center h-screen'>
      <Container />
    </div>
  )
}

export default App
