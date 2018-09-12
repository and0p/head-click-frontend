import React from 'react'
import { getRounded, getIdealCm360AtFOV, normalizeLowPercentage, getHorPlusFromVerticalFOV, getVFOVFromHorizontalFOV, getLinearSensitivity } from '../../../math'

// Lowest (non-zero) allowed setting for sensitivity, and the dots to rotate 360 at it
let baseSetting = 0.01, baseDots = 325483.00
// Minimum and maximum sensitivity settings allowed by game
let minSens = 0, maxSens = 50
// Minimum and maximum field-of-view settings allowed by game
let minFOV = 70, maxFOV = 90

const getOutput = (sensitivity, fovDots, settings) => {
    let result = settings.dpi.actual / 2.54
    result = (fovDots) / result
    result /= sensitivity
    return result
}

// Main function to get settings/output, based on user's profile/options
const getInfo = (settings, options) => {
    let fov = options["FOV"]
    let idealCm360 = getIdealCm360AtFOV(settings.sensitivity.actual, options["FOV"], "hor+")
    let sensitivity = getLinearSensitivity(baseDots, 0.01, idealCm360, settings.dpi.actual, minSens, maxSens, 2, settings)
    let output = getOutput(sensitivity, baseDots, settings)
    let settingsJSON = [
        {
            name: 'input.sensitivity',
            subtext: 'Console',
            value: sensitivity,
            important: true
        },
        {
            name: 'graphics.fov',
            subtext: 'Console',
            value: options["FOV"],
            important: true
        },
    ]
    let outputJSON = [
        {
            name: "Hip fire",
            alias: "Hip Fire",
            fov: getHorPlusFromVerticalFOV(settings.monitor.width, settings.monitor.height, options["FOV"]),
            vfov: fov,
            zoom: getRounded(1, 2),
            cm360: output,
            ideal: idealCm360,
            variance: normalizeLowPercentage(idealCm360 / output - 1) * 10
        },
        {
            name: "ADS",
            fov: getHorPlusFromVerticalFOV(settings.monitor.width, settings.monitor.height, options["FOV"] / 1.1),
            vfov: options["FOV"] / 1.1,
            zoom: getRounded(1, 2),
            cm360: getOutput(sensitivity, 3686, settings),
            ideal: getIdealCm360AtFOV(settings.sensitivity.actual, 97, "hor+"),
            variance: normalizeLowPercentage(idealCm360 / output - 1) * 10
        },
    ]
    // Object.keys(FOVs).map(key => {
    //     // Grab vertical FOV from options or from weapon zoom (static, not scaled)
    //     let thisVFOV = key == "Hipfire" ? getVFOVFromHorizontalFOV(settings.monitor.width, settings.monitor.height, fov) : FOVs[key].vfov
    //     let thisHFOV = getHorPlusFromVerticalFOV(settings.monitor.width, settings.monitor.height, thisVFOV)
    //     let zoom = fov / thisHFOV
    //     let thisIdealCm360 = getIdealCm360AtFOV(settings.sensitivity.actual, thisVFOV, "vertical")
    //     let thisOutput = getOutput(sensitivity, FOVs[key].dots, settings)
    //     outputJSON.push({
    //         name: key,
    //         alias: key,
    //         fov: thisHFOV,
    //         vfov: thisVFOV,
    //         zoom: getRounded(zoom, 2),
    //         cm360: thisOutput,
    //         ideal: thisIdealCm360,
    //         variance: normalizeLowPercentage(idealCm360 / thisOutput - 1) * 10
    //     })
    // })
    return {
        settings: settingsJSON,
        settingsHelp: <span>Enter the above commands into the console, which is accessed with F1 by default.<br/>For example, typing "input.sensitivity 0.5" and pressing enter will set your mouse sensitivity to 0.5.</span>,
        output: outputJSON
    }
}

export const Rust = {
    name: "Rust",
    shortName: "Rust",
    alias: "rust",
    hasLogo: "true",
    type: "average",
    infoFunction: getInfo,
    settings: {},
    options: [
        {
            name: "FOV",
            type: "slider",
            min: minFOV,
            max: maxFOV,
            step: 1,
            recommended: 74,
            default: 74
        }
    ]
}