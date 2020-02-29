const express = require('express')
const app = express()
const port = 3000

const journeys = require('./journeys');

app.get('/', (req, res) => res.send('A-ok'))

app.get('/journeys/:startId/:endId', (req, res) => {
  const journey = req.params
  journeys.get(journey.startId, journey.endId)
  .then((response) => {
    res.json(response);
  })
})

app.listen(port, () => console.log(`Listening`))