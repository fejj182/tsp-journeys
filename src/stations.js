const interrail = require("interrail");

const getStationByName = (name) => {
    return interrail.stations.search(name)
}

module.exports = {
  getStationByName
};
