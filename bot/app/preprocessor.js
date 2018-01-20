const Log = require('../api/Log')

function preProcessor (gameMap) {
  Log.log(
    `no data pre-processing performed. number of ships: ${
      gameMap.myShips.length
    }`
  )
}

module.exports = preProcessor
