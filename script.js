useLocal = true;
updateQuoteOnLoad = true;

const quotesRemote = 'https://raw.githubusercontent.com/JamesFT/Database-Quotes-JSON/master/quotes.json';
const quotesLocal = `quotes.json`;

let quotes = [];
let quotesShownInSession = [];
const quotesUrl = useLocal ? quotesLocal : quotesRemote;

$(() => {
    init(quotesUrl, updateQuoteOnLoad)
});

const init = (quotesURL, callback) => {
  const request = new XMLHttpRequest();
  request.onload = () => {
    quotes = Array.from(JSON.parse(request.responseText));
    if(updateQuoteOnLoad) {
      updateQuote(getRandomQuote());
    }
    $('#new-quote').click(updateQuote);
    
  }
  request.open('GET', quotesURL);
  request.send();
  return request;
}



const getRandomQuote = () => {
  if(quotes.length === 0) {
    return {quoteText: "I want to kick ass or cite quotes, and I'm all out of quotes.", quoteAuthor: 'This app'}
  }
  let quoteIdx = Math.round(Math.random() * quotes.length);
  
  quotes.splice(quoteIdx, 1);
  quotesShownInSession.push(quoteIdx);
  
  return quotes[quoteIdx];
} 

const updateQuote = () => {
  let quote = getRandomQuote();
  $('#text').text(quote.Quote);
  $('#author').text(quote.Author);
  const tweetText = encodeURIComponent(`${quote.Quote}\n\n-${quote.Author}`);
  $('#tweet-quote').prop('href', `https://twitter.com/intent/tweet?text=${tweetText}`);
}

