import Overwatch from './individual/Overwatch'
import Fortnite from './individual/Fortnite'
import R6Siege from './individual/R6Siege'

const gameData = [
    Overwatch,
    R6Siege,
    Fortnite,
    {
        name: "Player Unknown's Battlegrounds",
        shortName: "PUBG",
        alias: "pubg",
        hasLogo: false,
        math: {
            fov: {
                min: 60,
                max: 90,
                default: 90,
                recommended: 90,
                horizontal: true,
                basedOnSD: false
            },
            sensitivity: {
                min: 1,
                max: 25,
                default: 10,
                linear: true,   // scale: 1 instead?
                multiplier: 1,
                affectedByResolution: false,
                affectedByFov: false,
                rawInput: true,
                accelerationPossible: false,
                accelerationDefault: false,
                yaw: 0.022
            },
            recommended: {
                ideal: 34,
                min: 15,
                max: 46
            }
        },
        settings: {
            optimization: [],
            gameplay: []
        }
    },
    {
        name: "Counter-Strike: Global Offensive",
        shortName: "CS:GO",
        alias: "csgo",
        hasLogo: false,
        math: {
            fov: {
                min: 60,
                max: 90,
                default: 90,
                recommended: 90,
                horizontal: true,
                basedOnSD: false
            },
            sensitivity: {
                min: 1,
                max: 25,
                default: 10,
                linear: true,   // scale: 1 instead?
                multiplier: 1,
                affectedByResolution: false,
                affectedByFov: false,
                rawInput: true,
                accelerationPossible: false,
                accelerationDefault: false,
                yaw: 0.022
            },
            recommended: {
                ideal: 34,
                min: 15,
                max: 46
            }
        },
        settings: {
            optimization: [],
            gameplay: []
        }
    }
]

export const gameNamesByPopularity = [
    "fortnite",
    "pubg",
    "overwatch",
    "csgo",
    "r6siege"
]

// Add test games
for (var i = 0; i < 40; i++) {
    let testGame = {
        name: "Test Game " + i,
        shortName: "Test " + i,
        alias: "test" + i,
        hasLogo: false,
        math: {
            fov: {
                min: 60,
                max: 90,
                default: 90,
                recommended: 90,
                horizontal: true,
                basedOnSD: false
            },
            sensitivity: {
                min: 1,
                max: 25,
                default: 10,
                linear: true,   // scale: 1 instead?
                multiplier: 1,
                affectedByResolution: false,
                affectedByFov: false,
                rawInput: true,
                accelerationPossible: false,
                accelerationDefault: false,
                yaw: 0.022
            }
        },
        settings: {
            optimization: [],
            gameplay: []
        }
    }
    gameData.push(testGame);
    gameNamesByPopularity.push(testGame.alias)
}

// →►

export default gameData