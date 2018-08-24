import React from 'react'
import { getRounded, normalizeLowPercentage, clamp, getIdealCm360AtFOV, getVFOVFromHorizontalFOV } from '../../../math'

let baseHipDots = 54496
let minSensitivity = 0.01
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
    let sensitivity = clamp(getSensitivity(ideal, settings), minSensitivity, maxSensitivity)
    let outputHipFire = getCm360FromGameSettings(settings, sensitivity, baseHipDots)
    return {
        settings: [
            {
                name: 'Mouse Sensitivity',
                subtext: 'Settings ~ Gameplay ~ Mouse',
                icon: 'settings_ethernet',
                value: getRounded(sensitivity, 2),
                color: 'purple'
            },
            {
                name: 'ADS Mouse Sensitivity',
                subtext: 'Settings ~ Gameplay ~ Mouse',
                icon: 'settings_ethernet',
                value: "Relative",
                color: 'purple'
            },
            {
                name: 'Mouse Accleration',
                subtext: 'Settings ~ Gameplay ~ Mouse',
                icon: 'settings_ethernet',
                value: "0.00",
                color: 'purple'
            },
            {
                name: "Mouse Filtering",
                subtext: 'Settings ~ Gameplay ~ General',
                icon: 'videocam',
                value: 0,
                color: 'blue'
            },
            {
                name: "Field of View",
                subtext: 'Settings ~ Gameplay ~ General',
                icon: 'videocam',
                value: options["FOV"],
                color: 'blue'
            },
            {
                name: "ADS Field of View",
                subtext: 'Settings ~ Gameplay ~ General ~ Field of View',
                icon: 'videocam',
                value: "Affected",
                color: 'blue'
            },

        ],
        settingsHelp: <span>Settings taken from the beta. Subject to change before the game goes live. I also didn't thoroughly test how mouse sensitivity was changed by aspect ratios other than 16:9.</span>,
        output: [
            {
                name: "Hip Fire",
                alias: "Hip Fire",
                fov: options["FOV"],
                vfov: getVFOVFromHorizontalFOV(settings.monitor.width, settings.monitor.height, options["FOV"]),
                zoom: 1,
                cm360: outputHipFire,
                ideal: ideal,
                variance: normalizeLowPercentage(ideal / outputHipFire) - 1,
            },
            {
                name: "Iron Sights",
                alias: "Iron Sights",
                fov: options["FOV"] / 1.10,
                vfov: getVFOVFromHorizontalFOV(settings.monitor.width, settings.monitor.height, options["FOV"] * 1.10),
                zoom: 1.10,
                cm360: outputHipFire * 1.10,
                ideal: ideal * 1.10,
                variance: normalizeLowPercentage(ideal * 1.10 / outputHipFire * 1.10) - 1
            }
        ]
    }
}

const BlackOps4 = {
        name: "Call of Duty: Black Ops 4",
        shortName: "Black Ops 4",
        alias: "blackops4",
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
            "Graphics": [
                {
                    text: "Render Resolution",
                    value: "100",
                    note: false,
                    info: "Improved target clarity. Lower this as a last resort.",
                    critical: true
                },
                {
                    text: "Vertical Sync",
                    value: "OFF",
                    note: false,
                    info: "Unless your PC is powerful enough. Improves response time.",
                    critical: true
                },
                {
                    text: "Motion Blur",
                    value: "OFF",
                    note: true,
                    info: "Improved target clarity while aiming.",
                    critical: true
                },
                {
                    text: "Gameplay Framerate Limit",
                    value: "UNLIMITED",
                    note: true,
                    info: "Set this to UNLIMITED, or at least reasonably higher than your monitor's refresh rate.",
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
                min: 60,
                max: 120,
                step: 1,
                recommended: 106,
                default: 106,
            }
        ]
}

export default BlackOps4