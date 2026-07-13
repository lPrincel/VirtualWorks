document.addEventListener('DOMContentLoaded', () => {
    const voteButtons = document.querySelectorAll('.vote-btn');

    voteButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const card = e.target.closest('.coffee-card');
            const coffeeId = card.dataset.id;
            const votesSpan = card.querySelector('.votes');

            try {
                // Disable button during request to prevent double clicks
                button.disabled = true;

                const response = await fetch(`/vote/${coffeeId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                
                if (data.votes !== undefined) {
                    // Update vote count
                    votesSpan.textContent = data.votes;
                    
                    // Add pop animation class
                    votesSpan.classList.add('pop');
                    
                    // Remove animation class after it completes so it can trigger again
                    setTimeout(() => {
                        votesSpan.classList.remove('pop');
                    }, 200);
                }
            } catch (error) {
                console.error('Error voting for coffee:', error);
                alert('Failed to submit vote. Please try again.');
            } finally {
                // Re-enable button
                button.disabled = false;
            }
        });
    });
});
