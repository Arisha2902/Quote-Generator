        // DOM elements
        const quoteTextElement = document.getElementById('quote-text');
        const authorElement = document.getElementById('author');
        const newQuoteButton = document.getElementById('btn-new-quote');
        const tweetButton = document.getElementById('btn-tweet');
        const messageBox = document.getElementById('message-box');

        let currentQuote = "";
        let currentAuthor = "";

        // --- INTERNAL QUOTE DATA (Fallback method to ensure reliability) ---
        const quotes = [
            { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
            { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
            { quote: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
            { quote: "The mind is everything. What you think you become.", author: "Buddha" },
            { quote: "I attribute my success to this: I never gave or took an excuse.", author: "Florence Nightingale" },
            { quote: "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.", author: "Jimmy Dean" },
            { quote: "If you are working on something exciting that you really care about, you don't have to be pushed. The vision pulls you.", author: "Steve Jobs" },
            { quote: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
            { quote: "Tough times never last, but tough people do.", author: "Robert H. Schuller" },
            { quote: "Success is not final; failure is not fatal: It is the courage to continue that counts.", author: "Winston S. Churchill" }
        ];

        // Function to show a temporary message
        function showMessage(text, isError = false) {
            messageBox.textContent = text;
            // Use Tailwind classes for styling the message box
            messageBox.className = `mt-4 p-2 text-sm text-center rounded-lg ${isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`;
            messageBox.classList.remove('hidden');
            setTimeout(() => {
                messageBox.classList.add('hidden');
            }, 3000);
        }

        // Function to fetch and display a new quote (now using internal array)
        function getQuote() {
            // Set loading state for the button (temporarily for effect)
            newQuoteButton.disabled = true;
            newQuoteButton.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                Loading...
            `;
            quoteTextElement.textContent = 'Fetching inspiration...';
            authorElement.textContent = '— ...';

            try {
                // Get a random quote from the internal array
                const randomIndex = Math.floor(Math.random() * quotes.length);
                const randomQuote = quotes[randomIndex];

                currentQuote = randomQuote.quote;
                currentAuthor = randomQuote.author;

                // Update UI with the new quote
                quoteTextElement.textContent = currentQuote;
                authorElement.textContent = `— ${currentAuthor}`;
                showMessage('Quote loaded successfully!', false);

            } catch (error) {
                // This shouldn't happen with the internal array, but here for robustness
                console.error('Failed to load quote from internal array:', error);
                quoteTextElement.textContent = 'An unexpected error occurred while loading the quotes.';
                authorElement.textContent = '— Internal Error';
                showMessage('Internal error loading quotes.', true);
            } finally {
                // Reset button state
                setTimeout(() => {
                    newQuoteButton.disabled = false;
                    newQuoteButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.564 1 1 0 11-1.885.656A5.002 5.002 0 005.41 7H7a1 1 0 010 2H3a1 1 0 01-1-1V4a1 1 0 011-1zM16 17a1 1 0 01-1-1v-2.101a7.002 7.002 0 01-11.601-2.564 1 1 0 011.885-.656A5.002 5.002 0 0014.59 13H13a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-1 1z" clip-rule="evenodd" />
                        </svg>
                        New Quote
                    `;
                }, 200); // Small delay to show the loading spinner effect
            }
        }

        // Function to handle the Tweet button click
        function tweetQuote() {
            if (currentQuote && currentAuthor) {
                // Encode the text for the URL
                const textToTweet = `"${currentQuote}" — ${currentAuthor}`;
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textToTweet)}`;
                
                // Open the link in a new window/tab
                window.open(twitterUrl, '_blank');
            } else {
                showMessage("Please load a quote before trying to tweet!", true);
            }
        }

        // Event Listeners
        newQuoteButton.addEventListener('click', getQuote);
        tweetButton.addEventListener('click', tweetQuote);

        // Call getQuote on page load
        window.onload = getQuote;
