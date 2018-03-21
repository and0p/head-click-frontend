const gameData = [
    {
        name: "Overwatch",
        shortName: "Overwatch",
        alias: "overwatch",
        logo: "http://someurl.com/test.png",
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
        logo: "http://someurl.com/test.png",
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
            }
        },
        settings: {
            optimization: [],
            gameplay: []
        }
    }
]

// →►

export default gameData