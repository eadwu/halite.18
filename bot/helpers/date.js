function tick () {
  const currentDate = new Date()
  const date = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  })
  const time = currentDate.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  return `${time} ${date}`
}

module.exports = tick
