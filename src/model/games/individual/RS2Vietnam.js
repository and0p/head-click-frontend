import React from 'react'
import { getRounded, getIdealCm360AtFOV, normalizeLowPercentage, getHorPlusFromVerticalFOV, getVFOVFromHorizontalFOV, clamp } from '../../../math'

let baseDots = 659131 // at 0.01 sensitivity
let minSens = 0, maxSens = 50
let minFOV = 80, maxFOV = 106

let FOVs = {
    Sidearm: { vfov: 50.96498598, dots: 1147060 },
    MG: { vfov: 47.40721112, dots: 1225870 },
    SMG: { vfov: 43.21355794, dots: 1324320 },
    Launcher: { vfov: 39.31038801, dots: 1436090 },
    Rifle: { vfov: 34.79165947, dots: 1598720 },
    Binoculars: { vfov: 9.480862294, dots: 5550690 },
    XM21: { vfov: 8.516976242, dots: 6173080 },
    MN: { vfov: 7.335504883, dots: 7160050},
    SVD: { vfov: 6.40226551, dots: 8198030 }
}

// Get in-game sensitivity based on user input
const getSensitivity = (desiredCm360, settings) => {
    // Get desired dots based on actual DPI
    let desiredDots = desiredCm360 / 2.54 * settings.dpi.actual
    // Compare to base and return
    let multiplier = (baseDots / 10) / desiredDots
    return getRounded(clamp(multiplier, minSens, maxSens), 1)
}

const getOutput = (sensitivity, fovDots, settings) => {
    let result = settings.dpi.actual / 2.54
    result = (fovDots / 10) / result
    result /= sensitivity
    return result
}

// Main function to get settings/output, based on user's profile/options
const getInfo = (settings, options) => {
    let fov = options["FOV"]
    let idealCm360 = getIdealCm360AtFOV(settings.sensitivity.actual, options["FOV"], "hor+")
    let sensitivity = getSensitivity(idealCm360, settings)
    let output = getOutput(sensitivity, baseDots, settings)
    let settingsJSON = [
        {
            name: 'Mouse Sensitivity - In Game',
            subtext: 'Settings ~ Gameplay',
            value: sensitivity,
            important: true
        },
        {
            name: 'Mouse Sensitivity - Iron Sights',
            subtext: 'Settings ~ Gameplay',
            value: "0.50",
            important: true
        },
        {
            name: 'Mouse Sensitivity - Scopes',
            subtext: 'Settings ~ Gameplay',
            value: "0.50",
            important: true
        },
        {
            name: 'Iron Sight Free-Aim',
            subtext: 'Settings ~ Gameplay',
            value: "None",
            important: true
        },
        {
            name: 'Field of View',
            subtext: 'Settings ~ Player View & HUD',
            value: options["FOV"],
            important: true
        },
    ]
    let outputJSON = [
        {
            name: "Hip fire",
            alias: "Hip Fire",
            fov: options["FOV"],
            vfov: getVFOVFromHorizontalFOV(settings.monitor.width, settings.monitor.height, options["FOV"]),
            zoom: getRounded(1, 2),
            cm360: output,
            ideal: idealCm360,
            variance: normalizeLowPercentage(idealCm360 / output - 1) * 10
        }
    ]
    Object.keys(FOVs).map(key => {
        // Grab vertical FOV from options or from weapon zoom (static, not scaled)
        let thisVFOV = key == "Hipfire" ? getVFOVFromHorizontalFOV(settings.monitor.width, settings.monitor.height, fov) : FOVs[key].vfov
        let thisHFOV = getHorPlusFromVerticalFOV(settings.monitor.width, settings.monitor.height, thisVFOV)
        let zoom = fov / thisHFOV
        let thisIdealCm360 = getIdealCm360AtFOV(settings.sensitivity.actual, thisVFOV, "vertical")
        let thisOutput = getOutput(sensitivity, FOVs[key].dots, settings)
        outputJSON.push({
            name: key,
            alias: key,
            fov: thisHFOV,
            vfov: thisVFOV,
            zoom: getRounded(zoom, 2),
            cm360: thisOutput,
            ideal: thisIdealCm360,
            variance: normalizeLowPercentage(idealCm360 / thisOutput - 1) * 10
        })
    })
    return {
        settings: settingsJSON,
        output: outputJSON
    }
}

export const RS2Vietnam = {
    name: "Rising Storm 2: Vietnam",
    shortName: "RS2: Vietnam",
    alias: "rs2vietnam",
    hasLogo: "true",
    type: "tactical",
    infoFunction: getInfo,
    settings: {
        "Gameplay": [
            {
                text: "Enable Manual Bolt Action",
                value: "ON",
                note: false,
                info: "Makes rangefinding easier by letting you watch bullet land before animation starts.",
                critical: false
            }
        ],
        "Video": [
            {
                text: "Vsync",
                value: "OFF",
                note: false,
                info: "Disable for performance boost and lag reduction, if your computer isn't powerful enough.",
                critical: true
            }
        ]
    },
    options: [
        {
            name: "FOV",
            type: "slider",
            min: minFOV,
            max: maxFOV,
            step: 1,
            recommended: 106,
            default: 106
        }
    ]
}