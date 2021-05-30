// server.js
// This is where your node app starts

const sample = require('lodash/sample')
//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes", function (request, response) {
  response.send(quotes);
});

app.get("/quotes/random", function (request, response) {
  const randomQuote = sample(quotes)
  response.send(randomQuote);
});

// search for quote with the word passed in the query parameter 'term'
app.get("/quotes/search", function (request, response) {
  // get the search term from the query parameters
  let term = request.query.term

  // find all quotes containing the search term
  let matches = findQuotesContainingTerm(quotes, term)
  
  // respond with the matches
  response.send(matches);
});
//...END OF YOUR CODE

// //You can use this function to pick one element at random from a given array
// //example: pickFromArray([1,2,3,4]), or
// //example: pickFromArray(myContactsArray)
// //
// function pickFromArray(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// accepts an array of quotes and a term, returns all quotes containing that term
// in the author name or quote text
function findQuotesContainingTerm(quotes, term) {
  let lowercaseTerm = term.toLowerCase()

  // look at each quote object: 
  let matches = quotes.filter(item => {
    const lowercaseQuote = item.quote.toLowerCase()
    const lowercaseAuthor = item.author.toLowerCase()
    //   if author or quote contains term, include it in the result
    return lowercaseQuote.includes(lowercaseTerm) || lowercaseAuthor.includes(lowercaseTerm)
  })

  // return all matches
  return matches
}

//Start our server so that it listens for HTTP requests!
let port = 5000;

app.listen( port, function () {
  console.log("Your app is listening on port " + port);
});
