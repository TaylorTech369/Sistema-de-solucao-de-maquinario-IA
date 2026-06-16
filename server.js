import express from 'express';
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/perguntar', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ 
            sucesso: false,
            error: 'O campo "prompt" é obrigatório no corpo da requisição.' 
        });
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: prompt,
        });

        return res.json({
            sucesso: true,
            resposta: response.text
        });

    } catch (error) {
        console.error('Erro ao se comunicar com o Gemini:', error);
        return res.status(500).json({
            sucesso: false,
            error: 'Erro interno ao processar a requisição com a IA.'
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});