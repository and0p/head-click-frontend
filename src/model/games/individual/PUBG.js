import { getRounded, normalizeLowPercentage, clamp, getPercentageOfBaseFOV, getIdealCm360AtFOV } from '../../../util'

let baseDots = 12960;
let minSensitivity = 0;
let maxSensitivity = 100;
let idealFOV = 90;

let FOVs = {
    General: null,
    Vehicle: null,
    Targetting: null,
    Scoping: 70,
    Scope2x: 40,
    Scope3x: 26.666666,
    Scope4x: 19,
    Scope6x: 13.333333,
    Scope8x: 10,
    Scope15x: 6.666667
}

const getSensitivity = (desiredCm360, dpi, fov) => {
    let desiredDots = desiredCm360 * dpi
    let fovDots = baseDots / fov
    let rawSensitivity = fovDots / desiredDots * 2.54
    // convert to PUBG slider
    return clamp(Math.log(Math.pow(rawSensitivity / 0.002, 50)) / Math.log(10), minSensitivity, maxSensitivity)
}

const getCm360FromGameSettings = (dpi, gameSetting, fov) => {
    let rawSensitivity = 0.002 * Math.pow(10, gameSetting / 50)
    let dots = baseDots / fov / rawSensitivity
    return dots * 2.54 / dpi
}

const getInfo = (settings, options) => {
    // Get the FOV from user Head Click options
    let fov = options["View"] == "First Person" ? options["First Person FOV"] : 80
    FOVs.General = fov
    FOVs.Vehicle = fov
    FOVs.Targetting = fov
    // Build the result, looping over views and respective FOVs
    let settingsJSON = []
    let outputJSON = []
    Object.keys(FOVs).map(key => {
        let thisFOV = FOVs[key]
        let idealCm360 = getIdealCm360AtFOV(settings.sensitivity.actual, thisFOV)
        let setting = getSensitivity(idealCm360, settings.dpi.actual, thisFOV)
        let output = getCm360FromGameSettings(settings.dpi.actual, getRounded(setting, 0), thisFOV)
        console.log("for " + thisFOV + "ideal cm: " + idealCm360 +", setting: " + setting +", output: " + output)
        settingsJSON.push({
            name: 'Sensitivity - ' + key,
            subtext: 'Settings ~ Control ~ Mouse',
            icon: 'settings_ethernet',
            value: getRounded(setting, 0),
            color: 'purple'
        })
        outputJSON.push({
            name: key == "Scoping" ? "ADS" : key,
            fov: getRounded(thisFOV, 2),
            zoom: getRounded(fov / thisFOV, 2),
            cm360: getRounded(output, 2),
            ideal: getRounded(idealCm360, 2),
            variance: getRounded(normalizeLowPercentage(idealCm360 / output - 1) * 100, 2),
        })
    })
    if(options["View"] == "First Person")
        settingsJSON.push({
            name: "FPSCameraFOV",
            subtext: 'Settings ~ Graphics ~ Screen',
            icon: 'videocam',
            value: fov,
            color: 'blue'
        })
    return {
        settings: settingsJSON,
        output: outputJSON
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
        },
    },
    options: [
        {
            name: "View",
            type: "buttons",
            values: [
                "First Person",
                "Third Person"
            ],
            default: "Third Person",
        },
        {
            name: "First Person FOV",
            type: "buttons",
            values: [
                "80",
                "90",
                "103"
            ],
            default: "103",
            dependant: {
                name: "View",
                value: "First Person"
            }
        }
    ]
}

export default PUBG