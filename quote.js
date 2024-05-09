
const quote = document.querySelector(".quote");
const author = document.querySelector("#author");
const btn = document.querySelector("#btn1");
const api_url = "https://type.fit/api/quotes";



async function getQuote(url) {
        const response = await fetch(url);
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        const selectedQuote = data[randomIndex];

        quote.innerHTML = selectedQuote.text;

        
        if (selectedQuote.author !== 'type.fit') {
            author.innerHTML = selectedQuote.author;
        } else {
            author.innerHTML = '';
        }
    }

    getQuote(api_url);
    btn.addEventListener("click", function() {
      preventDefault();
        getQuote(api_url);
    });



