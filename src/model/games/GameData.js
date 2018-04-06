const gameData = [
    {
        name: "Overwatch",
        shortName: "Overwatch",
        alias: "overwatch",
        hasLogo: true,
        math: {
            fov: {
                min: 50,
                max: 103,
                default: 103,
                recommended: 103,
                horizontal: true,
                basedOnSD: false
            },
            sensitivity: {
                min: 1,
                max: 25,
                default: 10,
                linear: true,   // scale: 1 instead
                multiplier: (10/3),
                affectedByResolution: false,
                affectedByFov: false,
                rawInput: true,
                accelerationPossible: true,
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
            optimization: [
                {
                    text: "Triple Buffering - OFF",
                    subtext: "Options ~ Display ~ Triple Buffering",
                    info: "Triple buffering is the worst. Read more...",
                    critical: true
                },
                {
                    text: "Reduce Buffer - ON",
                    subtext: "Options ~ Display ~ Reduce Buffering",
                    info: "This option reduces input lag by not pre-rendering frames.",
                    critical: true
                },
                {
                    text: "VSYNC - OFF*",
                    subtext: "Options ~ Display ~ VSYNC",
                    info: "Only use VSYNC in a competitive FPS if your machine can comfortably render with it at your monitor's maximum refresh rate. Otherwise you could experience input lag.",
                    critical: false
                },
                {
                    text: "Limit FPS - OFF*",
                    subtext: "Options ~ Display ~ Limit FPS",
                    info: "Set this to OFF, or at least reasonably higher than your monitor's refresh rate.",
                    critical: false
                },
                {
                    text: "Render Scale - 100%",
                    subtext: "Options ~ Display ~ Graphics Quality ~ Advanced ~ Render Scale",
                    info: "Render the game at your full resolution, improving clarity. Lower this for improved performance as a last resort.",
                    critical: false
                }
            ],
            gameplay: [
                {
                    text: "Mercy - Beam Toggle - ON",
                    subtext: "Options ~ Controls ~ Mercy ~ Beam Toggle",
                    info: "This keeps your beam going without having to hold the button.",
                    critical: false
                }
            ]
        }
    },
    {
        name: "Rainbow Six Siege",
        shortName: "R6 Siege",
        alias: "r6siege",
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
                linear: true,   // scale: 1 instead
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
                max: 46
            }
        },
        recommended: {
            ideal: 34,
            min: 15,
            max: 46
        }
    },
    {
        name: "Fortnite",
        shortName: "Fortnite",
        alias: "fortnite",
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