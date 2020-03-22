const express = require('express')
const app = express()
const port = 3000

const journeys = require('./src/journeys')

const server = app.listen(port, function() {
  console.log(`Listening on ${port} :)`);
});

app.get('/', (req, res) => res.send('A-ok'))

app.get('/journeys/:startId/:endId', (req, res) => {
  const journey = req.params
  journeys.getJourneyDuration(journey.startId, journey.endId)
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
  journeys.captureConnection(journey.startId, journey.endId)
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
