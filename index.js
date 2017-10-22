const express = require('express')
const lrs = require('./public/speech_to_text')
const app = express()
const port = 3000

app.use('/public', express.static(__dirname + "/public")); 

app.get('/', (request, response) => {
  // response.send('Hello from Express!')
  response.sendFile(__dirname + '/index.html'); 
})

app.get('/server.js', (request, response) => {
  lrs.cli.parse('listen');
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
