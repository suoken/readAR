const express = require('express')
const speech = require('./speech')
const lrs = require('./speech_to_text')
const app = express()
const port = 3000

app.get('/', (request, response) => {
  response.send('Hello from Express!')
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
