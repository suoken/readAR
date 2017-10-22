const express = require('express')
const lrs = require('./public/speech_to_text')
const speech = require('./public/new_speech.js')
var ejs = require('ejs');
const app = express()
const port = 3000

app.use('/public', express.static(__dirname + "/public")); 

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
  lrs.cli.parse('listen');
})

app.get('/stories.html', (request, response) => { 
	response.sendFile(__dirname + '/public/stories.html'); 
})

app.get('/account.html', (request, response) => { 
	response.sendFile(__dirname + '/public/account.html')
})

app.get('/server.js', (request, response) => {
  lrs.cli.parse('listen');
})

app.get('/text', (request, response) => {
	// response.setHeader('Content-Type', 'application/json');
	// var speecher = { 'transcription': speech.text };  

	// response.send(JSON.stringify(speecher));
	response.json({"transcription" : speech.text()})
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
