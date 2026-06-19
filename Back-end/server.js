import express from 'express';
import { GoogleGenAI } from '@google/genai';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/perguntar', async (req, res) => {
    const { equipamento, sintoma } = req.body;

    const prompt = `
        Você é um Engenheiro de Manutenção Industrial Sênior.

        Equipamento:
        ${equipamento}

        Sintoma relatado:
        ${sintoma}

        Sua função é gerar SOMENTE um protocolo inicial de triagem.

        Regras obrigatórias:

        1. Considere exclusivamente o equipamento informado.
        2. Priorize segurança do operador.
        3. Se houver risco elétrico ou mecânico, mencione Lockout/Tagout.
        4. Não proponha desmontagens complexas.
        5. Não invente informações.
        6. Responda em português.
        7. Gere exatamente:

        ANÁLISE INICIAL

        PASSO 1:
        ...

        PASSO 2:
        ...

        PASSO 3:
        ...

        QUANDO ACIONAR A ENGENHARIA:
        ...
`;

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
            text: response.text
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
