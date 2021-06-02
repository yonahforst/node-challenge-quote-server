// server.js
// This is where your node app starts

const sample = require('lodash/sample')
//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");



//START OF YOUR CODE...
// GET - Read all quotes
app.get("/quotes", function (request, response) {
  response.send(quotes);
});

// GET - Returns a single quote object (by it's position in the array)
app.get('/quotes/:id', function (request, response) {
  const index = parseInt(request.params.id) - 1
  const quote = quotes[index]
  if (quote) {
    response.send(quote)
  } else {
    response.status(404).send()
  }
})

// POST - Create a new quote (add it to the end of the array)
app.post('/quotes', function (request, response) {
  // get the new quote object
  const quote = {
    quote: request.query.quote,
    author: request.query.author,
  }
  // add it to the quotes array
  quotes.push(quote)
  // return the id for the new quote object
  response.status(201).send({ id: quotes.length })
})

// PUT - Update an existing quote
app.put('/quotes/:id', function (request, response) {
  // get the new quote object
  const quote = {
    quote: request.query.quote,
    author: request.query.author,
  }
  // get the index of existing quote object
  const index = parseInt(request.params.id) -1

  // replace existing quote object at specified index with new one
  const result = quotes.splice(index, 1, quote)
  console.log('removed quote', result)

  // return new quote object
  response.send(quote)
})

// DELETE - Delete an existing quote from the array
app.delete('/quotes/:id', function (request, response) {
  // get the index of existing quote object
  const index = parseInt(request.params.id) -1

  // replace existing quote object at specified index with undefined
  quotes.splice(index, 1, undefined)
  // return status 204 - no content
  response.status(204).send()
})

//Start our server so that it listens for HTTP requests!
let port = 5000;

app.listen( port, function () {
  console.log("Your app is listening on port " + port);
});
