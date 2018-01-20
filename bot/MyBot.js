const Game = require('./api/Game')

const stratagem = require('./app/stratagem')
const preProcessor = require('./app/preprocessor')

Game.start({
  botName: 'LOGIC',
  preProcessing: preProcessor,
  strategy: stratagem
})
