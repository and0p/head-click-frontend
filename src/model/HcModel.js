import Game from './Game'
import gameData, { gameNamesByPopularity } from './games/GameData'
import gameStats from './games/GameStats'
import Mouse from './Mouse'
import mouseData from './mice/MouseData'
import monitorData, {customMonitor as custmon} from './monitors/MonitorData'

// Export game list as Game objects
export const games = []
export const gamesAlphabetically = []
export const gamesWithOutputFunctions = []
for(var i in gameData) {
    let game = new Game(gameData[i])
    games[gameData[i].alias] = game
    gamesAlphabetically.push(game)
    if (game.hasOwnProperty("outputFunction"))
        gamesWithOutputFunctions.push(game)
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

// Export monitor list, including a flattened version
export const monitors = monitorData
export const customMonitor = custmon
export const monitorsFlat = {}
Object.keys(monitors).map((ratioKey) => (
    Object.keys(monitors[ratioKey]).map((monitorKey) => (
        monitorsFlat[monitorKey] = monitors[ratioKey][monitorKey]
    ))
))

export const refreshRates = [ 60, 75, 100, 120, 144 ]