document.getElementById('summarize-btn').addEventListener('click', async () => {
    const timeLimit = document.getElementById('time-limit').value;
    const resultDiv = document.getElementById('result');
    const loader = document.getElementById('loader');

    resultDiv.textContent = '';
    loader.style.display = 'block';

    try {
        // Get the current active tab's URL
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const url = tab.url;

        // Send to your local Node.js backend
        const response = await fetch('http://localhost:3000/api/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url, timeLimit: parseInt(timeLimit) })
        });

        const data = await response.json();

        if (response.ok) {
            resultDiv.textContent = data.summary;
        } else {
            resultDiv.textContent = 'Error: ' + data.error;
        }
    } catch (error) {
        resultDiv.textContent = 'Failed to connect to backend. Is the server running?';
        console.error(error);
    } finally {
        loader.style.display = 'none';
    }
});