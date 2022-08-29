const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//loader

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// new Quote
function newQuote() {
  loading();
  //pick a random quote from Quoteapi;
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // if no author for the quote
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  //Check code length to determining styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
}

async function getQuotes() {
  loading();
  const apiurl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiurl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // catch error here.
  }
}

// TweetQuote

function tweetQuote() {
  const twitterurl = `
    https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterurl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// getQuotes();
loading();
