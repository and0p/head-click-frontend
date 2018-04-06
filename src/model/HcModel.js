import Game from './Game'
import gameData, { gameNamesByPopularity } from './games/GameData'
import gameStats from './games/GameStats'
import Mouse from './Mouse'
import mouseData from './mice/MouseData'
import monitorData from './monitors/MonitorData'

// Export game list as Game objects
export const games = {}
for(var i in gameData) {
    games[gameData[i].alias] = new Game(gameData[i])
}

export const gamesByPopularity = []
for(var i in gameNamesByPopularity) {
    gamesByPopularity.push(games[gameNamesByPopularity[i]])
}

// Export mice as Mouse objects
export const mice = {}
for(var i in mouseData) {
    mice[mouseData[i].name] = new Mouse(mouseData[i])
}

// Export monitor list
export const monitors = monitorData

export const refreshRates = [ 60, 75, 100, 120, 144 ]