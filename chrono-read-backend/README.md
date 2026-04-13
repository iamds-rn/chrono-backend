# ChronoRead Backend 🚀

The high-performance engine powering the **ChronoRead Chrome Extension**. This backend handles web scraping, text processing, and AI communication to deliver summaries tailored to a user's specific time constraints.

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Web Scraping:** Cheerio (for efficient DOM parsing)
* **AI Engine:** Google Generative AI (Gemini 2.5 Flash)
* **Hosting:** Render / GitHub

## 🧠 How It Works
1.  **Request:** Receives a URL and a `timeLimit` from the Chrome Extension.
2.  **Scrape:** Uses `cheerio` to extract the core text content from the article, filtering out ads and navigation bars.
3.  **Process:** Estimates word counts and formats a specialized prompt for the AI.
4.  **Summarize:** Communicates with the Gemini API to generate a summary that fits the user's requested reading time.
5.  **Deliver:** Sends the formatted text back to the browser.

## ⚙️ Environment Variables
To run this project, you will need to add the following variables to your `.env` file or your cloud hosting environment:

`GEMINI_API_KEY` = Your Google AI Studio API Key
`PORT` = 3000 (Local) or dynamic (Cloud)

## 📜 License
MIT License - Feel free to use this for your own projects!