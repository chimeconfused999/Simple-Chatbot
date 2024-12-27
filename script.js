import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import openai from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: '' });

console.log('API Key:', process.env.OPENAI_KEY);


const app = express();
app.use(cors());
app.use(bodyParser.json());

const openaiClient = new openai.OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-4o',
      messages,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
