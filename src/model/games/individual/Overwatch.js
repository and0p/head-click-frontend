import { getRounded, normalizeLowPercentage, clamp } from '../../../util'

let baseDots = 54543;
let minSensitivity = 1;
let maxSensitivity = 100;

const getSensitivity = settings => {
    return getRounded(clamp((baseDots / (settings.dpi.actual / 2.54) / settings.sensitivity.actual), minSensitivity, maxSensitivity), 2)
}

const getCm360FromGameSettings = (settings, gameSetting) => {
    let result = settings.dpi.actual / 2.54
    result = baseDots / result
    result /= gameSetting
    return result
}

const getInfo = settings => {
    let sensitivity = getSensitivity(settings)
    let outputHipFire = getCm360FromGameSettings(settings, sensitivity)
    return {
        settings: [
            {
                name: 'Sensitivity',
                icon: 'settings_ethernet',
                value: getRounded(sensitivity, 2),
                color: 'purple'
            },
            {
                name: "FOV",
                icon: 'videocam',
                value: 103,
                color: 'blue'
            }
        ],
        output: [
            {
                name: 'Hip Fire',
                value: getRounded(outputHipFire, 2),
                valueDescription: 'cm/360',
                desired: getRounded(settings.sensitivity.actual, 2),
                variance: getRounded(normalizeLowPercentage(settings.sensitivity.actual / outputHipFire - 1) * 100, 2) + '%',
                colored: true
            },
            {
                name: 'Hor. FOV',
                value: 103,
                valueDescription: 'cm/360',
                desired: 106,
                variance: 103 - 106,
                colored: false
            }
        ]
    }
}

const Overwatch = {
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
        infoFunction: getInfo,
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
            ],
            overrides: {
                cm360: true,
                dpi: true,
                resolution: false
            },
        },

}

export default Overwatch