import dotenv from 'dotenv'
dotenv.config({ path: '../.env', quiet: true })
import OpenAI from 'openai'
const AI = new OpenAI( {
   apiKey: process.env.OPENAI_API_KEY,
   baseURL: process.env.OPENAI_BASE_URL
}
)
try {
  const response = await AI.chat.completions.create({
    model: "gemini-2.5-flash",
    messages: [
      {
        role: "user",
        content: "Hello"
      }
    ]
  });

  console.log(response.choices[0].message.content);
} catch (err) {
  console.dir(err, { depth: null });
}
export default AI