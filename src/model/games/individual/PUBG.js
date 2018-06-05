import { getRounded, normalizeLowPercentage, clamp, getPercentageOfBaseFOV, getIdealCm360AtFOV } from '../../../math'

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

let aliases = {
    General: "Hip",
    Vehicle: "Hip",
    Targetting: "Hip",
    Scoping: "ADS",
    Scope2x: "2x",
    Scope3x: "3x",
    Scope4x: "4x",
    Scope6x: "6x",
    Scope8x: "8x",
    Scope15x: "15x"
}

const getSensitivity = (desiredCm360, dpi, fov) => {
    let desiredDots = desiredCm360 / 2.54 * dpi
    let fovDots = baseDots / fov
    let rawSensitivity = fovDots / desiredDots
    // convert to PUBG slider
    return getRounded(clamp(Math.log(Math.pow(rawSensitivity / 0.002, 50)) / Math.log(10), minSensitivity, maxSensitivity), 0)
}

const getCm360FromGameSettings = (dpi, gameSetting, fov) => {
    let rawSensitivity = 0.002 * Math.pow(10, gameSetting / 50)
    let dots = baseDots / fov / rawSensitivity
    return dots / dpi * 2.54
}

const getInfo = (settings, options) => {
    // Get the FOV from user Head Click options
    let fov = options["View"] == "First Person" ? options["FOV"] : 80
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
        let output = getCm360FromGameSettings(settings.dpi.actual, setting, thisFOV)
        settingsJSON.push({
            name: 'Sensitivity - ' + key,
            subtext: 'Settings ~ Control ~ Mouse',
            value: setting
        })
        outputJSON.push({
            name: key == "Scoping" ? "ADS" : key,
            alias: aliases[key],
            fov: thisFOV,
            zoom: getRounded(fov / thisFOV, 2),
            cm360: output,
            ideal: idealCm360,
            variance: normalizeLowPercentage(idealCm360 / output - 1) * 100
        })
    })
    settingsJSON.push({
        name: "Vertical Sens. Multiplier",
        subtext: 'Settings ~ Control ~ Mouse',
        icon: 'videocam',
        value: 1.00,
        color: 'blue'
    })
    if(options["View"] == "First Person")
        settingsJSON.push({
            name: "FPSCameraFOV",
            subtext: 'Settings ~ Graphics ~ Display Settings',
            icon: 'videocam',
            value: fov,
            color: 'blue'
        })
    return {
        settings: settingsJSON,
        output: outputJSON,
        graph: outputJSON.filter(o => o.name != "Vehicle" && o.name != "Targetting")
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
        "Graphics": [
            {
                text: "Foliage",
                value: "LOW",
                note: false,
                info: "Makes targets easier to spot in the wild.",
                critical: true
            },
            {
                text: "V-Sync",
                value: "OFF",
                note: false,
                info: "Performance boost, unless your computer is good enough.",
                critical: false
            },
            {
                text: "Motion Blur",
                value: "OFF",
                note: false,
                info: "Performance boost amd improved clarity.",
                critical: false
            },
        ]
    },
    overrides: {
        cm360: true,
        dpi: true,
        resolution: false
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
            name: "FOV",
            type: "slider",
            min: 80,
            max: 103,
            step: 1,
            recommended: 103,
            default: 103,
            dependant: {
                name: "View",
                value: "First Person"
            }
        }
    ]
}

export default PUBG