const interrail = require('interrail')

const get = (startId, endId) => {
  return interrail.journeys(startId, endId, {transfers: 0, results: 1})
  .then(response => {
    const journey = response[0].legs[0]
    const timeMs = new Date(journey.arrival) - new Date(journey.departure)
    return {
      duration: timeMs / 1000 / 60
    }
  })
}

exports.get = get