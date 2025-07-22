import { GoogleGenerativeAI } from "@google/generative-ai";
import { createAirlanggaPrompt } from "@/constants/prompt";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_MODEL = process.env.GOOGLE_MODEL || "";

if (!GOOGLE_API_KEY) {
  throw new Error("VITE_GOOGLE_API_KEY is not defined in .env file");
}

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: GOOGLE_MODEL,
});

export async function askAboutMe(question: string): Promise<string> {
  const prompt = createAirlanggaPrompt(question);
  console.log(prompt, " prompt");
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    console.log(response.text(), " result");
    return response.text();
  } catch (error) {
    console.error("Error in askAboutMe function:", error);
    throw new Error("Failed to get response from AI.");
  }
}
