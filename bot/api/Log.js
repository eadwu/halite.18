const fs = require('fs')

let logFile

class Log {
  static init (filePath) {
    logFile = fs.createWriteStream(filePath, { flags: 'w' })
    return Log
  }

  static log (line) {
    logFile.write(line + '\n')
    return Log
  }
}

module.exports = Log
