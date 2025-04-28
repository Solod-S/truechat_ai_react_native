import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const MAX_HISTORY_LENGTH = 5;

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-latest",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 4096,
};

// Инициализация с пустой историей, если она не была инициализирована ранее
export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

let specializationAdded = false;

export async function getGoogleAIResponse(text, firsRender, specialization) {
  try {
    if (!chatSession.history || firsRender) {
      console.log(`clear `);
      chatSession.history = [];
      specializationAdded = false; // сбросим флаг при новом запуске сессии
    }

    // Добавляем специализацию в историю, если она еще не была добавлена
    if (specialization && !specializationAdded) {
      chatSession.history.push({
        role: "system",
        parts: [
          {
            text: `You are a bot specialized in ${specialization}. Please answer as if you are an expert in this field.`,
          },
        ],
      });
      specializationAdded = true; // ставим флаг, чтобы не добавлять повторно
    }

    // Добавляем пользовательский текст в историю чата
    chatSession.history.push({
      role: "user",
      parts: [{ text: text }],
    });

    // Обрезаем историю, если она слишком длинная
    if (chatSession.history.length > MAX_HISTORY_LENGTH * 2) {
      chatSession.history = chatSession.history.slice(-MAX_HISTORY_LENGTH * 2);
    }

    // Получаем ответ от модели
    const result = await chatSession.sendMessage(text);

    // Добавляем ответ модели в историю
    chatSession.history.push({
      role: "model",
      parts: [{ text: result.response.text() }],
    });

    return { success: true, content: result.response.text() };
  } catch (error) {
    console.log("Error in getGoogleAIResponse:", error);
    return {
      success: true,
      content:
        "Request limit reached. The bot is currently overloaded. Please try again later.",
    };
  }
}
