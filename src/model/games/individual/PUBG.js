import { getRounded, normalizeLowPercentage, clamp } from '../../../util'

let baseDots = 12960;
let minSensitivity = 0;
let maxSensitivity = 100;
let idealFOV = 90;

const getSensitivity = settings => {
    let desiredDots = settings.sensitivity.actual * settings.dpi.actual
    let fovDots = baseDots / idealFOV
    let rawSensitivity = fovDots / desiredDots * 2.54
    // convert to PUBG slider
    return getRounded(clamp(Math.log(Math.pow(rawSensitivity / 0.002, 50)) / Math.log(10), minSensitivity, maxSensitivity), 0)
}

const getCm360FromGameSettings = (settings, gameSetting) => {
    let rawSensitivity = 0.002 * Math.pow(10, gameSetting / 50)
    let dots = baseDots / idealFOV / rawSensitivity
    return dots * 2.54 / settings.dpi.actual
}

const getInfo = settings => {
    let sensitivity = getSensitivity(settings)
    let outputHipFire = getCm360FromGameSettings(settings, sensitivity)
    return {
        settings: [
            {
                name: 'Sensitivity',
                icon: 'settings_ethernet',
                value: getRounded(sensitivity, 0),
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

const PUBG = {
        name: "PlayerUnknown's Battlegrounds",
        shortName: "PUBG",
        alias: "pubg",
        hasLogo: false,
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
               
            ],
            gameplay: [
                
            ],
            overrides: {
                cm360: true,
                dpi: true,
                resolution: false
            }
        }
}

export default PUBG