import { getRounded } from '../../../math'

let baseDots = 64805;

const getSensitivity = settings => {
    return baseDots / (settings.dpi.actual / 2.54) / settings.sensitivity.actual
}

const getCm360FromGameSettings = (settings, gameSetting) => {
    let result = settings.dpi.actual / 2.54
    result = baseDots / result
    result /= gameSetting
    return result
}

const getInfo = (settings, options) => {
    let sensitivity = getSensitivity(settings)
    let outputHipFire = getCm360FromGameSettings(settings, sensitivity)
    return {
        settings: [
            {
                name: 'Sensitivity',
                icon: 'settings_ethernet',
                //value: "." + sensitivity.padStart(2, '0'),
                value: getRounded(sensitivity / 100, 3),
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
                variance: getRounded((outputHipFire / settings.sensitivity.actual - 1) * 100, 2) + '%'
            },
            {
                name: 'Iron Sights',
                value: getRounded(outputHipFire, 2),
                valueDescription: 'cm/360',
                desired: getRounded(settings.sensitivity.actual, 2),
                variance: getRounded((outputHipFire / settings.sensitivity.actual - 1) * 100, 2) + '%'
            }
        ]
    }
}

const Fortnite = {
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
    infoFunction: getInfo,
    settings: {
        optimization: [],
        gameplay: []
    },
    options: []
}

export default Fortnite