import Game from './Game'
import gameData from './games/GameData'
import Mouse from './Mouse'
import mouseData from './mice/MouseData'
import monitorData from './monitors/MonitorData'

// Export game list as Game objects
export const games = {}
for(var i in gameData) {
    games[gameData[i].alias] = new Game(gameData[i])
}

// Export mice as Mouse objects
export const mice = {}
for(var i in mouseData) {
    mice[mouseData[i].name] = new Mouse(mouseData[i])
}

// Export monitor list
export const monitors = monitorData

export const refreshRates = [ 60, 75, 100, 120, 144 ]