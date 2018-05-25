import { getRounded } from '../../../util'

let baseDots = 62828;

const getSensitivity = (settings, options) => {
    return baseDots / (settings.dpi.actual / 2.54) / settings.sensitivity.actual
}

const getCm360FromGameSettings = (settings, gameSetting) => {
    let result = settings.dpi.actual / 2.54
    result = baseDots / result
    result /= gameSetting
    return result
}

const getInfo = settings => {
    return {
        settings: [
            {
                name: 'Mouse Sensitivity Horizontal',
                icon: 'settings_ethernet',
                value: getRounded(getSensitivity(settings), 0),
                color: 'purple'
            },
            {
                name: 'Mouse Sensitivity Vertical',
                icon: 'settings_ethernet',
                value: getRounded(getSensitivity(settings), 0),
                color: 'purple'
            },
            {
                name: "FOV",
                icon: 'videocam',
                value: 73,
                color: 'blue'
            }
        ],
        output: [

        ]
    }
}

export const R6Siege = {
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
    infoFunction: getInfo,
    settings: {
        optimization: [],
        gameplay: []
    },
    options: []
}

export default R6Siege