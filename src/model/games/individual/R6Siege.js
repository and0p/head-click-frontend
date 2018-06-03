import { getRounded, getIdealCm360AtFOV, normalizeLowPercentage, getHorPlusFromVerticalFOV } from '../../../math'

// Dots to rotate 360, if zoomed then assuming zoom modified is "50"
let sights = {
    hip: {
        name: "Hip Fire",
        baseDots: 62828,
        zoom: 1
    },
    ads: {
        name: "Iron Sights",
        baseDots: 104734,
        zoom: 1.1
    },
    reddot: {
        name: "Reflex Sights",
        baseDots: 104723,
        zoom: 1.1
    },
    acog: {
        name: "ACOG",
        baseDots: 179522,
        zoom: 2.5
    },
    glaz: {
        name: "Glaz",
        baseDots: 209446,
        zoom: 2.8
    },
}

let minSensitivity = 1
let maxSensitivity = 100
let idealFOV = 74
let baseModifier = 50
let idealModifier = 76

const getInGameSensitivity = (desiredCm360, dpi, sightBaseDots) => {
    return sightBaseDots / (dpi / 2.54) / desiredCm360
}

const getCm360ForSight = (gameSetting, dpi, modifier, sight) => {
    if(sight.name == "Hip Fire")
        return sight.baseDots / gameSetting / dpi * 2.54 
    else
        return (sight.baseDots / (modifier / baseModifier)) / gameSetting / dpi * 2.54
}

const getInfo = (settings, options) => {
    // Get base FOV TODO use options
    let baseFOV = getHorPlusFromVerticalFOV(settings.monitor.width, settings.monitor.height, idealFOV)
    // Get ideal cm for base FOV (hip fire)
    let baseDesiredCM = getIdealCm360AtFOV(settings.sensitivity.actual, baseFOV)
    // Get in-game setting that reflects this TODO also add config file option
    let gameSetting = getRounded(getInGameSensitivity(baseDesiredCM, settings.dpi.actual, sights.hip.baseDots), 0)
    let settingsJSON = [
            {
                name: 'Mouse Sensitivity Horizontal',
                subtext: 'Settings ~ Controls',
                value: gameSetting
            },
            {
                name: 'Mouse Sensitivity Vertical',
                subtext: 'Settings ~ Controls',
                value: gameSetting
            },
            {
                name: 'Zoom Modifier',
                subtext: 'Settings ~ Controls',
                value: idealModifier
            },
            {
                name: "FOV",
                subtext: 'Settings ~ Display',
                value: idealFOV
            }
        ]
    let outputJSON = []
    Object.keys(sights).map(sight => {
        let sightFOV = baseFOV / sights[sight].zoom
        let desiredCm360 = getIdealCm360AtFOV(settings.sensitivity.actual, sightFOV)
        let output = getCm360ForSight(gameSetting, settings.dpi.actual, idealModifier, sights[sight])
        outputJSON.push({
                name: sights[sight].name,
                alias: sights[sight].name,
                fov: sightFOV,
                zoom: sights[sight].zoom,
                cm360: output,
                ideal: desiredCm360,
                variance: normalizeLowPercentage(desiredCm360 / output - 1) * 100
        })
    })
    return {
        settings: settingsJSON,
        output: outputJSON
    }
}

export const R6Siege = {
    name: "Rainbow Six Siege",
    shortName: "R6 Siege",
    alias: "r6siege",
    hasLogo: false,
    math: {
        fov: {
            min: 70,
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
    },
    options: []
}

export default R6Siege