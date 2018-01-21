function mapRange (end, mapFunc) {
  const result = []
  for (let idx = 0; idx < end; idx++) {
    result.push(mapFunc(idx))
  }

  return result
}

function forEachInRange (end, actionFunc) {
  for (let idx = 0; idx < end; idx++) {
    actionFunc(idx)
  }
}

exports.mapRange = mapRange
exports.forEachInRange = forEachInRange
