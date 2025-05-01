import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Инициализация GoogleGenAI
const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_GOOGLE_AI_API_KEY,
});

const MODEL_NAME = "learnlm-1.5-pro-experimental";
const config = {
  responseMimeType: "text/plain",
};

export async function GET(req) {
  try {
    const query = req.nextUrl.searchParams.get("ques") || "";
    console.log("query", query);

    // Формируем содержимое запроса
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: query,
          },
        ],
      },
    ];

    // Выполняем запрос к API
    const response = await ai.models.generateContentStream({
      model: MODEL_NAME,
      config,
      contents,
    });

    let fullResponse = "";
    for await (const chunk of response) {
      fullResponse += chunk.text; // Собираем все части в один полный текст
    }

    console.log("Full Response:", fullResponse);

    return NextResponse.json({ resp: [{ content: fullResponse }] });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
