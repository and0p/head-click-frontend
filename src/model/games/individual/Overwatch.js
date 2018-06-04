import { getRounded, normalizeLowPercentage, clamp } from '../../../math'

let baseHipDots = 54543
let baseWidowDots = 181819
let minSensitivity = 1
let maxSensitivity = 100
let idealFOV = 103
let widowFOV = 38

const getSensitivity = (settings, options) => {
    return getRounded(clamp((baseHipDots / (settings.dpi.actual / 2.54) / settings.sensitivity.actual), minSensitivity, maxSensitivity), 2)
}

const getCm360FromGameSettings = (settings, gameSetting, baseDots) => {
    let result = settings.dpi.actual / 2.54
    result = baseDots / result
    result /= gameSetting
    return result
}

const getInfo = (settings, options) => {
    let sensitivity = clamp(getSensitivity(settings), minSensitivity, maxSensitivity)
    let outputHipFire = getCm360FromGameSettings(settings, sensitivity, baseHipDots)
    let outputWidow = getCm360FromGameSettings(settings, sensitivity, baseWidowDots)
    return {
        settings: [
            {
                name: 'Sensitivity',
                subtext: 'Settings ~ Controls',
                icon: 'settings_ethernet',
                value: getRounded(sensitivity, 2),
                color: 'purple'
            },
            {
                name: "FOV",
                subtext: 'Settings ~ Video',
                icon: 'videocam',
                value: 103,
                color: 'blue'
            }
        ],
        output: [
            {
                name: "Hip Fire",
                alias: "Hip Fire",
                fov: 103,
                zoom: 1,
                cm360: outputHipFire,
                ideal: settings.sensitivity.actual,
                variance: normalizeLowPercentage(settings.sensitivity.actual / outputHipFire - 1) * 100,
            },
            {
                name: "Widowmaker",
                alias: "Widow",
                fov: 50.91,
                zoom: 2.02,
                cm360: outputWidow,
                ideal: settings.sensitivity.actual * 2.02,
                variance: normalizeLowPercentage((settings.sensitivity.actual * 2.02) / outputWidow - 1) * 100
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
            "Display": [
                {
                    text: "Triple Buffering",
                    value: "OFF",
                    note: false,
                    subtext: "Options ~ Display ~ Triple Buffering",
                    info: "Delays input significantly by pre-rendering multiple frames.",
                    critical: true
                },
                {
                    text: "Reduce Buffer",
                    value: "ON",
                    note: false,
                    subtext: "Options ~ Display ~ Reduce Buffering",
                    info: "Reduce input lag by removing miscellaneous buffering.",
                    critical: true
                },
                {
                    text: "VSYNC",
                    value: "OFF",
                    note: true,
                    subtext: "Options ~ Display ~ VSYNC",
                    info: "Less screen tearing with performance cost.",
                    critical: false
                },
                {
                    text: "Limit FPS - OFF*",
                    value: "OFF",
                    note: true,
                    subtext: "Options ~ Display ~ Limit FPS",
                    info: "Set this to OFF, or at least reasonably higher than your monitor's refresh rate.",
                    critical: false
                },
                {
                    text: "Render Scale",
                    value: "100%",
                    note: false,
                    subtext: "Options ~ Display ~ Graphics Quality ~ Advanced ~ Render Scale",
                    info: "Render the game at your full resolution, improving clarity. Lower this for improved performance as a last resort.",
                    critical: false
                }
            ],
            "Gameplay": [
                {
                    text: "Mercy - Beam Toggle",
                    value: "ON",
                    note: false,
                    subtext: "Options ~ Controls ~ Mercy ~ Beam Toggle",
                    info: "This keeps your beam going without having to hold the button.",
                    critical: false
                }
            ],
        },
        overrides: {
            cm360: true,
            dpi: true,
            resolution: false
        },
        options: []
}

export default Overwatch