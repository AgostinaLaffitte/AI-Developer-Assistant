import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const generateAIResponse = async (type, userText, filters = {}) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("API Key no encontrada");

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // USAMOS EL NOMBRE EXACTO QUE APARECE EN TU PANTALLA
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const roles = {
    editor: "Mejora este texto técnico:",
    tutor: "Explica este código:",
    tester: "Genera tests para este código:"
  };

  const prompt = `${roles[type] || roles.editor}\n\n${userText}\n\nIdioma: ${filters.language || 'español'}.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("ERROR GOOGLE:", error.message);
    throw error;
  }
};