import { OpenAIAPI } from "openai";
import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Replace 'your-api-key' with your actual API key from OpenAI
const apiKey = "your-api-key";
const promptPrefix = "User: ";

const openaiInstance = new OpenAIAPI({ key: apiKey });

async function getChatbotResponse(userInput) {
  const prompt = `${promptPrefix}${userInput}`;
  const response = await openaiInstance.complete({
    engine: "text-davinci-002", // You can try different engines
    prompt,
    max_tokens: 150,
  });

  return response.choices[0].text.trim();
}

async function chat() {
  let userInput;

  while (true) {
    userInput = await promptUser();
    if (userInput.toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
      break;
    }

    const chatbotResponse = await getChatbotResponse(userInput);
    console.log(`Chatbot: ${chatbotResponse}`);
  }
}

function promptUser() {
  return new Promise((resolve) => {
    rl.question("You: ", (userInput) => {
      resolve(userInput);
    });
  });
}

// Start the chatbot
chat();
