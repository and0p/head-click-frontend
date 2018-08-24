import React from 'react'
import { getRounded, normalizeLowPercentage, clamp, getIdealCm360AtFOV, getVFOVFromHorizontalFOV } from '../../../math'

let baseHipDots = 54545
let minSensitivity = 1
let maxSensitivity = 100
let idealFOV = 106
let widowFOV = 38
let zoomModifier = 50

const getSensitivity = (ideal, settings) => {
    return getRounded(clamp((baseHipDots / (settings.dpi.actual / 2.54) / ideal), minSensitivity, maxSensitivity), 2)
}

const getCm360FromGameSettings = (settings, gameSetting, baseDots) => {
    let result = settings.dpi.actual / 2.54
    result = baseDots / result
    result /= gameSetting
    return result
}

const getInfo = (settings, options) => {
    let ideal = getIdealCm360AtFOV(settings.sensitivity.actual, options["FOV"], "hor+")
    let sensitivity = getRounded(clamp(getSensitivity(ideal, settings), minSensitivity, maxSensitivity), 0)
    let outputHipFire = getCm360FromGameSettings(settings, sensitivity, baseHipDots)
    return {
        settings: [
            {
                name: 'Look Sensitivity',
                subtext: 'Settings ~ Controls ~ Mouse',
                icon: 'settings_ethernet',
                value: getRounded(sensitivity, 2),
                color: 'purple'
            },
            {
                name: 'ADS Sensitivity Modifier',
                subtext: 'Settings ~ Controls ~ Mouse',
                icon: 'settings_ethernet',
                value: "1.0",
                color: 'purple'
            },
            {
                name: 'Aim Smoothing',
                subtext: 'Settings ~ Controls ~ Mouse',
                icon: 'settings_ethernet',
                value: "Off",
                color: 'purple'
            },
            {
                name: 'Field of View',
                subtext: 'Settings ~ Video',
                icon: 'settings_ethernet',
                value: options["FOV"],
                color: 'purple'
            }
        ],
        settingsHelp: <span>Destiny 2 uses Overwatch's exact math for calculating aim, but only lets you use whole numbers for the sensitivity setting. If the output cm/360 is way off, try using the override feature (at the top of this card) and setting a lower DPI for this game. That should increase the odds of it matching your desired sensitivity.</span>,
        output: [
            {
                name: "Hip Fire",
                alias: "Hip Fire",
                fov: options["FOV"],
                vfov: getVFOVFromHorizontalFOV(settings.monitor.width, settings.monitor.height, options["FOV"]),
                zoom: 1,
                cm360: outputHipFire,
                ideal: ideal,
                variance: normalizeLowPercentage(ideal / outputHipFire - 1) * 100,
            },
            {
                name: "Iron Sights",
                alias: "Iron Sights",
                fov: options["FOV"] / 1.4,
                vfov: getVFOVFromHorizontalFOV(settings.monitor.width, settings.monitor.height, options["FOV"] * 1.4),
                zoom: 1.40,
                cm360: outputHipFire * 1.40,
                ideal: ideal * 1.40,
                variance: normalizeLowPercentage(ideal / outputHipFire - 1) * 100,
            }
        ]
    }
}

const Destiny2 = {
        name: "Destiny 2",
        shortName: "Destiny 2",
        alias: "destiny2",
        hasLogo: true,
        type: "average",
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
            "Video": [
                {
                    text: "Vsync",
                    value: "OFF",
                    note: false,
                    info: "Unless your PC is powerful enough. Improves response time.",
                    critical: true
                },
                {
                    text: "Framerate Cap Enabled",
                    value: "OFF",
                    note: true,
                    info: "Disable this, or set the cap reasonably higher than your monitor refresh rate.",
                    critical: false
                },
                {
                    text: "Advanced - Motion Blur",
                    value: "OFF",
                    note: true,
                    info: "Improved target clarity while aiming.",
                    critical: false
                },
            ],
        },
        overrides: {
            cm360: true,
            dpi: true,
            resolution: false
        },
        options: [
            {
                name: "FOV",
                type: "slider",
                min: 55,
                max: 105,
                step: 1,
                recommended: 105,
                default: 105,
            }
        ]
}

export default Destiny2