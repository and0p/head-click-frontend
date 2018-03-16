import Game from './Game'
import gameData from './games/GameData'
import Mouse from './Mouse'
import mouseData from './mice/MouseData'

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
export const monitors = {
    "640x480": {
        name: "640x480",
        width: 640,
        height: 480,
        aspectRatio: "4:3",
        recommendedDpi: 400
    },
    "800x600": {
        name: "800x600",
        width: 800,
        height: 600,
        aspectRatio: "4:3",
        recommendedDpi: 400
    },
    "1080p": {
        name: "1080p",
        width: 1920,
        height: 1080,
        aspectRatio: "16:9",
        recommendedDpi: 800
    }
}

export const refreshRates = [ 60, 75, 120, 144 ]