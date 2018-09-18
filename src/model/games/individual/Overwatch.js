import React from 'react'
import { getRounded, normalizeLowPercentage, clamp, getIdealCm360AtFOV, getLinearSensitivity } from '../../../math'

// Lowest (non-zero) allowed setting for sensitivity, and the dots to rotate 360 at it
let baseSetting = 1, baseDots = 54543
// Minimum and maximum sensitivity settings allowed by game
let minSens = 1, maxSens = 100
// Minimum and maximum field-of-view settings allowed by game
let minFOV = 80, maxFOV = 103

const getCm360FromGameSettings = (dpi, gameSetting, baseDots) => {
    let result = dpi / 2.54
    result = baseDots / result
    result /= gameSetting
    return result
}

const getInfo = (settings, options) => {
    let desiredCm360 = getIdealCm360AtFOV(settings.sensitivity.actual, 103, "hor+")
    let sensitivity = getLinearSensitivity(baseDots, baseSetting, desiredCm360, settings.dpi.actual, minSens, maxSens, 2)
    let outputHipFire = getCm360FromGameSettings(settings.dpi.actual, sensitivity, baseDots)
    let outputWidow = outputHipFire * 2
    return {
        settings: [
            {
                name: 'Sensitivity',
                subtext: 'Settings ~ Controls ~ Mouse',
                icon: 'settings_ethernet',
                value: getRounded(sensitivity, 2),
                color: 'purple'
            },
            {
                name: 'Widowmaker Zoom',
                subtext: 'Settings ~ Controls ~ Hero',
                icon: 'settings_ethernet',
                value: 50,
                color: 'purple'
            },
            {
                name: 'Ana Zoom',
                subtext: 'Settings ~ Controls ~ Hero',
                icon: 'settings_ethernet',
                value: 50,
                color: 'purple'
            },
            {
                name: "Field of View",
                subtext: 'Settings ~ Video',
                icon: 'videocam',
                value: 103,
                color: 'blue'
            }
        ],
        settingsHelp: <span>The Ana and Widowmaker settings can be found by going to Settings, Controls, and then selecting them in the dropdown in the top-right corner. Additional options will be revealed under "Hero".<p/>Set "relative aim sensitivity while zoomed" to 50 for both heroes.</span>,
        output: [
            {
                name: "Hip Fire",
                alias: "Hip Fire",
                fov: 103,
                vfov: 0,
                zoom: 1,
                cm360: outputHipFire,
                ideal: desiredCm360,
                variance: normalizeLowPercentage(desiredCm360 / outputHipFire - 1) * 100
            },
            {
                name: "Ana / Widowmaker",
                alias: "Zoom",
                fov: 50.91,
                vfov: 0,
                zoom: 2.02,
                cm360: outputWidow,
                ideal: desiredCm360 * 2.02,
                variance: normalizeLowPercentage((desiredCm360 * 2.02) / outputWidow - 1) * 100
            }
        ]
    }
}

const Overwatch = {
        name: "Overwatch",
        shortName: "Overwatch",
        alias: "overwatch",
        hasLogo: true,
        type: "average",
        infoFunction: getInfo,
        getSensitivity: (desiredCm360, dpi, options) => getRounded(getLinearSensitivity(baseDots, baseSetting, desiredCm360, dpi, minSens, maxSens, 2),2),
        getCm360: (sensitivity, dpi, options) => getRounded(getCm360FromGameSettings(dpi, sensitivity, baseDots), 1),
        defaultSensitivity: 5,
        sensitivityDecimalPoints: 2,
        settings: {
            "Display": [
                {
                    text: "Triple Buffering",
                    value: "OFF",
                    note: false,
                    subtext: "Options ~ Display ~ Triple Buffering",
                    info: "Delays input significantly by pre-rendering multiple frames.",
                    critical: true
                },
                {
                    text: "Reduce Buffer",
                    value: "ON",
                    note: false,
                    info: "Reduce input lag by removing miscellaneous buffering.",
                    critical: true
                },
                {
                    text: "VSYNC",
                    value: "OFF",
                    note: true,
                    info: "Less screen tearing with performance cost.",
                    critical: false
                },
                {
                    text: "Limit FPS",
                    value: "OFF",
                    note: true,
                    info: "Set this to OFF, or at least reasonably higher than your monitor's refresh rate.",
                    critical: false
                },
                {
                    text: "Graphics Quality - Advanced - Render Scale",
                    value: "100%",
                    note: false,
                    info: "Render the game at your full resolution, improving clarity. Lower this for improved performance as a last resort.",
                    critical: false
                }
            ],
            "Gameplay": [
                {
                    text: "Mercy - Beam Toggle",
                    value: "ON",
                    note: false,
                    subtext: "Options ~ Controls ~ Mercy ~ Beam Toggle",
                    info: "This keeps your beam going without having to hold the button.",
                    critical: false
                }
            ],
        },
        options: []
}

export default Overwatch