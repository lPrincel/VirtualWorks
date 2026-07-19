document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const quoteContent = document.getElementById('quote-content');
    const quoteText = document.getElementById('main-quote-text');
    const quoteAuthor = document.getElementById('main-quote-author');
    const spinner = document.getElementById('loading-spinner');
    const historyList = document.getElementById('history-list');

    // Load history on initial page load
    fetchHistory();

    generateBtn.addEventListener('click', generateQuote);

    async function generateQuote() {
        // UI updates for loading state
        generateBtn.disabled = true;
        quoteContent.classList.add('fade-out');
        spinner.classList.remove('hidden');

        try {
            const response = await fetch('/api/generate_quote');
            const data = await response.json();

            if (data.status === 'success') {
                // Update main display
                setTimeout(() => {
                    quoteText.textContent = data.quote;
                    quoteAuthor.textContent = `- ${data.author}`;
                    
                    spinner.classList.add('hidden');
                    quoteContent.classList.remove('fade-out');
                    quoteContent.classList.add('fade-in');
                    
                    // Remove animation class after it completes to allow re-trigger
                    setTimeout(() => quoteContent.classList.remove('fade-in'), 500);
                    
                    // Refresh history
                    fetchHistory();
                }, 300); // Small delay for smooth transition effect
            } else {
                showError('Failed to generate quote. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
            showError('A network error occurred.');
        } finally {
            generateBtn.disabled = false;
        }
    }

    async function fetchHistory() {
        try {
            const response = await fetch('/api/history');
            const data = await response.json();

            if (data.status === 'success') {
                renderHistory(data.history);
            }
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    }

    function renderHistory(history) {
        historyList.innerHTML = ''; // Clear current list

        if (history.length === 0) {
            historyList.innerHTML = '<div class="history-placeholder">No history available yet. Generate a quote to start!</div>';
            return;
        }

        history.forEach((item, index) => {
            const date = new Date(item.date_added).toLocaleString(undefined, { 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            // Stagger animation delay slightly based on index, capping at 5
            historyItem.style.animationDelay = `${Math.min(index * 0.1, 0.5)}s`;
            
            historyItem.innerHTML = `
                <div class="history-item-quote">"${item.quote}"</div>
                <div class="history-item-footer">
                    <span class="history-item-author">- ${item.author}</span>
                    <span class="history-item-date">${date}</span>
                </div>
            `;
            
            historyList.appendChild(historyItem);
        });
    }

    function showError(message) {
        quoteText.textContent = message;
        quoteAuthor.textContent = '';
        spinner.classList.add('hidden');
        quoteContent.classList.remove('fade-out');
    }
});
