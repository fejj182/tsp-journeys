const express = require('express')
const app = express()
const port = 3000

const journeys = require('./journeys')

const server = app.listen(port, function() {
  console.log('Listening :)');
});

app.get('/', (req, res) => res.send('A-ok'))

app.get('/journeys/:startId/:endId', (req, res) => {
  const journey = req.params
  journeys.get(journey.startId, journey.endId)
  .then((response) => {
    res.json(response);
  })
  .catch(e => {
    res.sendStatus(500)
    server.close(() => {
      console.log(e)
      console.log("Doh :(")
    });
  })
})

app.get('/journeys/:startId/:endId/capture', (req, res) => {
  const journey = req.params
  journeys.capture(journey.startId, journey.endId)
  .then((response) => {
    res.json(response);
  })
  .catch(e => {
    res.sendStatus(500)
    server.close(() => {
      console.log(e)
      console.log("Doh :(")
    });
  })
})
