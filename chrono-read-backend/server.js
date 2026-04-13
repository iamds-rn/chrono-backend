require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cheerio = require('cheerio');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/summarize', async (req, res) => {
    const { url, timeLimit } = req.body;

    if (!url || !timeLimit) {
        return res.status(400).json({ error: 'URL and timeLimit are required' });
    }

    try {
        const response = await fetch(url);
        const html = await response.text();
        
        // FIXED: Using .load() instead of .select()
        const $ = cheerio.load(html);
        
        let articleText = '';
        $('h1, h2, h3, p').each((i, el) => {
            articleText += $(el).text() + '\n\n';
        });

        const maxChars = 30000; 
        if (articleText.length > maxChars) {
            articleText = articleText.substring(0, maxChars);
        }

        // UPDATED: Using the 2026 stable model name
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const targetWordCount = timeLimit * 200;

        const prompt = `
            You are an expert summarizer. I have an article I want to read, but I only have ${timeLimit} minutes.
            Assuming an average reading speed of 200 words per minute, generate a summary that is approximately ${targetWordCount} words long.
            Make it engaging, capture the main points, and format it with short paragraphs or bullet points for easy reading.
            
            Article Text:
            ${articleText}
        `;

        const result = await model.generateContent(prompt);
        const summary = result.response.text();

        res.json({ summary: summary });

    } catch (error) {
        console.error("Summarization Error:", error);
        res.status(500).json({ error: 'Failed to process the article' });
    }
});

// FIXED: Port setup for Cloud Hosting (Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`ChronoRead Backend running on port ${PORT}`);
});