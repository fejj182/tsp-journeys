const interrail = require('interrail')

const get = (startId, endId) => {
  return interrail.journeys(startId, endId, {transfers: 0, results: 1})
  .then(response => {
    let duration = 0;

    if (response.length > 0) {
      const journey = response[0].legs[0]
      const timeMs = new Date(journey.arrival) - new Date(journey.departure)
      duration = timeMs / 1000 / 60
    }

    return { duration }
  })
}

exports.get = get