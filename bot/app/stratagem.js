const Constants = require('../api/Constants')
const Planet = require('../api/Planet')
const Log = require('../api/Log')

/**
 * Moves ship to (or closer to) entity
 * @param {Ship} ship - The origin ship
 * @param {Entity} entity - The target entity
 * @param {number} displacement - Distance to keep away from target
 * @return {string} The move command
 */
function move (ship, entity, displacement = Constants.SHIP_RADIUS) {
  if (entity instanceof Planet && displacement > 0) {
    displacement = entity.radius + Constants.DOCK_RADIUS - 1
  }

  return ship.navigate({
    target: entity,
    keepDistanceToTarget: displacement,
    speed: Constants.MAX_SPEED
  })
}

/**
 * The algorithm that defines how an attack should occur
 * @param {Ship} ship - The origin ship
 * @param {Ship} hostile - The target ship
 * @param {Ship} friendly - Fallback ship after attack
 * @return {string} The move command
 */
function attack (ship, hostile, friendly) {
  return ship.delta(hostile) <= Constants.WEAPON_RADIUS &&
    friendly &&
    ship.delta(friendly) > ship.delta(hostile)
    ? move(ship, friendly, 1)
    : move(ship, hostile)
}

/**
 * Attempts to dock the ship if possible or move it closer to the planet
 * @param {Ship} ship - The origin ship
 * @param {Planet} planet - The target planet
 * @return {string} The dock|move command
 */
function attemptDock (ship, planet) {
  return ship.canDock(planet) ? ship.dock(planet) : move(ship, planet)
}

function stratagem (gameMap) {
  const { myShips, enemyShips, myPlanets, neutralPlanets, enemyPlanets } = gameMap

  const dockablePlanets = myPlanets.filter(p => p.hasDockingSpot())
  const activeHostiles = enemyShips.filter(s => s.undocked)
  const idleHostiles = enemyShips.filter(s => !s.undocked)
  const activeFriendlies = myShips.filter(s => s.undocked)

  return activeFriendlies.map(ship => {
    const dockablePlanet = ship.closestEntityFrom(dockablePlanets)
    const freePlanet = ship.closestEntityFrom(neutralPlanets)
    const activeHostilePlanet = ship.closestEntityFrom(enemyPlanets)
    const activeHostile = ship.closestEntityFrom(activeHostiles)
    const idleHostile = ship.closestEntityFrom(idleHostiles)
    const friendly = ship.closestEntityFrom(myShips, 1)

    if (dockablePlanet) {
      return attemptDock(ship, dockablePlanet)
    } else if (freePlanet) {
      return attemptDock(ship, freePlanet)
    }

    return null
  })
}

module.exports = stratagem
