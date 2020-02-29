const interrail = require('interrail')

const get = (startId, endId) => {
  return interrail.journeys(startId, endId, {transfers: 0, results: 1})
  .then(response => {
    const journey = response[0]  
    return {
      journeyTime: journeyTime(journey.legs[0].departure, journey.legs[0].arrival)
    }
  })
  .catch(e => e)
}

const journeyTime = (departure, arrival) => {
  const timeMs = new Date(arrival) - new Date(departure)
  return timeMs / 1000 / 60
}

exports.get = get