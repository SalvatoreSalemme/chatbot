index.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Sei un assistente aziendale professionale." },
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();
  const aiReply = data.choices[0].message.content;

  res.json({ reply: aiReply });
});

app.listen(3000, () => {
  console.log("Bot backend attivo su http://localhost:3000");
});
