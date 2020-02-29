const interrail = require('interrail')

const get = (startId, endId) => {
  return interrail.journeys(startId, endId)
}

exports.get = get