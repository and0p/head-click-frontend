import React from 'react'
import { getRounded, normalizeLowPercentage, clamp, getIdealCm360AtFOV, getVFOVFromHorizontalFOV, getLinearSensitivity } from '../../../math'

// Lowest (non-zero) allowed setting for sensitivity, and the dots to rotate 360 at it
let baseSetting = 1, baseDots = 54496
// Minimum and maximum sensitivity settings allowed by game
let minSens = 0.01, maxSens = 100
// Minimum and maximum field-of-view settings allowed by game
let minFOV = 80, maxFOV = 103

const getCm360FromGameSettings = (settings, gameSetting, baseDots) => {
    let result = settings.dpi.actual / 2.54
    result = baseDots / result
    result /= gameSetting
    return result
}

const getInfo = (settings, options) => {
    let desiredCm360 = getIdealCm360AtFOV(settings.sensitivity.actual, options["FOV"], "hor+")
    let sensitivity = getLinearSensitivity(baseDots, baseSetting, desiredCm360, settings.dpi.actual, minSens, maxSens, 2)
    let outputHipFire = getCm360FromGameSettings(settings, sensitivity, baseDots)
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
                ideal: desiredCm360,
                variance: normalizeLowPercentage(desiredCm360 / outputHipFire) - 1,
            },
            {
                name: "Iron Sights",
                alias: "Iron Sights",
                fov: options["FOV"] / 1.10,
                vfov: getVFOVFromHorizontalFOV(settings.monitor.width, settings.monitor.height, options["FOV"] * 1.10),
                zoom: 1.10,
                cm360: outputHipFire * 1.10,
                ideal: desiredCm360 * 1.10,
                variance: normalizeLowPercentage(desiredCm360 * 1.10 / outputHipFire * 1.10) - 1
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