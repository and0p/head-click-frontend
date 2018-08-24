import React from 'react'
import { getRounded, getIdealCm360AtFOV, normalizeLowPercentage, getHorPlusFromVerticalFOV, getVFOVFromHorizontalFOV } from '../../../math'

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

const getConfigSensitivity = (desiredCm360, dpi) => {
    // Base config sensitivity of 0.02 gives 62828 dots to rotate 360 at 1 sensitivity (hip fire)
    // Divide by 50 and we get 1257
    // Get desired dots
    let desiredDots = desiredCm360 / 2.54 * dpi
    // Compare to base of 62828 when at slider 50 (so base / 50)
    let m = desiredDots / (62828 / 50) // at 48 desired cm this comes out to ~18.047
    // Config is 0.02 divided by that value
    return getRounded(0.02 / m, 6)
}

const getInGameSensitivity = (desiredCm360, dpi, sightBaseDots) => {
    return sightBaseDots / (dpi / 2.54) / desiredCm360
}

const getCm360ForSight = (gameSetting, configSetting, dpi, modifier, sight) => {
    // Get config setting variance
    let multiplier = configSetting / 0.02
    if(sight.name == "Hip Fire")
        return sight.baseDots / gameSetting / dpi * 2.54 / multiplier
    else
        return (sight.baseDots / (modifier / baseModifier)) / gameSetting / dpi * 2.54 / multiplier
}

const getInfo = (settings, options) => {
    // Get base FOV from options
    let baseHFOV = getHorPlusFromVerticalFOV(settings.monitor.width, settings.monitor.height, options["FOV"])
    let baseVFOV = options["FOV"]
    // Get ideal zoom modifier based on options
    let idealModifier = options["Preferred Sight"] == "Zoom" ? 57 : 76
    // Get ideal cm for base FOV (hip fire)
    let baseDesiredCM = getIdealCm360AtFOV(settings.sensitivity.actual, baseVFOV, "vertical")
    // Get in-game setting that reflects this TODO also add config file option
    let gameSetting = options["Method"] == "Config File" ? 50 : getRounded(getInGameSensitivity(baseDesiredCM, settings.dpi.actual, sights.hip.baseDots), 0)
    let configSetting = options["Method"] == "Config File" ? getConfigSensitivity(baseDesiredCM, settings.dpi.actual) : 0.02
    let settingsJSON = [
        {
            name: 'Mouse Sensitivity Horizontal',
            subtext: 'Settings ~ Controls',
            value: gameSetting,
            important: true
        },
        {
            name: 'Mouse Sensitivity Vertical',
            subtext: 'Settings ~ Controls',
            value: gameSetting,
            important: true
        },
        {
            name: 'Zoom Modifier',
            subtext: 'Settings ~ Controls',
            value: idealModifier
        },
        {
            name: "FOV",
            subtext: 'Settings ~ Display',
            value: options["FOV"]
        },
        {
            name: 'MouseSensitivityMultiplierUnit',
            subtext: 'Config File ~ INPUT',
            value: getRounded(configSetting, 6),
            important: options["Method"] == "Config File"
        },
    ]
    let outputJSON = []
    Object.keys(sights).map(sight => {
        let sightHFOV = baseHFOV / sights[sight].zoom
        let desiredCm360 = getIdealCm360AtFOV(settings.sensitivity.actual, baseVFOV / sights[sight].zoom, "vertical")
        let output = getCm360ForSight(gameSetting, configSetting, settings.dpi.actual, idealModifier, sights[sight])
        let name = sights[sight].name
        outputJSON.push({
                name: name,
                alias: name == "Reflex Sights" ? "Reflex" : name == "Iron Sights" ? "ADS" : name,
                fov: sightHFOV,
                vfov: baseVFOV / sights[sight].zoom,
                zoom: sights[sight].zoom,
                cm360: output,
                ideal: desiredCm360,
                variance: normalizeLowPercentage(desiredCm360 / output - 1) * 100
        })
    })
    return {
        settings: settingsJSON,
        settingsHelp: options["Method"] == "Config File" ? <span>The most accurate method to adjust sensitivity for Rainbow Six Siege is to change the multiplier in the user configuration file. This file is usually in a randomly generated folder found in: <p/>%USERPROFILE%/Documents/My Games/Rainbow Six Siege/<p/>While the game is not running, open the file in a text editor, modify the MouseSensitivityMultiplierUnit variable to the value seen above, and save the file. Changes to the file made while the game is running are ignored and overwritten.</span> : <span>This method assumes the user config file remains unmodified. The standard multiplier variable is listed above for reference.</span>,
        output: outputJSON,
        anotherThing: Math.random()
    }
}

export const R6Siege = {
    name: "Rainbow Six Siege",
    shortName: "R6 Siege",
    alias: "r6siege",
    hasLogo: false,
    type: "average",
    math: {
        fov: {
            min: 60,
            max: 90,
            default: 60,
            recommended: 74,
            horizontal: false,
            basedOnSD: true
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
    options: [
        {
            name: "Method",
            type: "buttons",
            values: [
                "Config File",
                "In-Game"
            ],
            default: "Config File",
            recommended: "Config File"
        },
        {
            name: "Preferred Sight",
            type: "buttons",
            values: [
                "ADS / Reflex",
                "Zoom"
            ],
            default: "Zoom",
        },
        {
            name: "FOV",
            type: "slider",
            min: 60,
            max: 90,
            step: 1,
            recommended: 74,
            default: 74
        }
    ]
}

export default R6Siege