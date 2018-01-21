const Log = require('../api/Log')

function preProcessor (gameMap) {
  Log.log(`Number of planes found: ${gameMap.planets.length}`)
    .log(`Number of ships found: ${gameMap.ships.length}`)
    .log(`Number of friendly ships: ${gameMap.myShips.length}`)
    .log(`Number of hostile ships: ${gameMap.enemyShips.length}`)
}

module.exports = preProcessor
