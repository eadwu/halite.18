const Log = require('./Log')
const Networking = require('./Networking')
const GameMapParser = require('./GameMapParser')

const tick = require('../helpers/date')

let mapParser = null

function parseGameMeta (lines) {
  const playerId = parseInt(lines[0])
  const widthHeight = lines[1].trim().split(' ')

  return {
    myPlayerId: playerId,
    width: parseInt(widthHeight[0]),
    height: parseInt(widthHeight[1])
  }
}

class Game {
  /**
   * starts a game with a specified bot name and a strategy
   * @param botName bot name
   * @param {function(GameMap)} preProcessing optional function that will be called once with an initial map to prepare data. it must finish within a minute
   * @param {function{GameMap)} strategy function with game map as a parameter that returns a list of moves to take
   */
  static start ({ botName, preProcessing, strategy }) {
    let turnNumber = 1

    function startGameLoop () {
      Networking.forEachReadLine(line => {
        Log.log(`${tick()}, Turn ${turnNumber}`)
        const map = mapParser.parse(line)
        const moves = strategy(map)

        Networking.sendMoves(moves.filter(m => m !== null))
        Log.log(moves.join(' '))
        turnNumber++
      })
    }

    function startPreProcessing () {
      Networking.readLine(line => {
        const map = mapParser.parse(line)

        if (preProcessing) {
          preProcessing(map)
        }

        Networking.writeLine(botName)
        startGameLoop()
      })
    }

    Networking.readNLines(2, lines => {
      const parsedGameMeta = parseGameMeta(lines)

      Log.init(`${botName}${parsedGameMeta.myPlayerId}.log`)
      mapParser = new GameMapParser(parsedGameMeta)
      startPreProcessing()
    })
  }
}

module.exports = Game
