import React from 'react'
import { getRounded, normalizeLowPercentage, clamp, getIdealCm360AtFOV, getVFOVFromHorizontalFOV, getLinearSensitivity } from '../../../math'

// Lowest (non-zero) allowed setting for sensitivity, and the dots to rotate 360 at it
let baseSetting = 1, baseDots = 54496
// Minimum and maximum sensitivity settings allowed by game
let minSens = 0.01, maxSens = 100
// Minimum and maximum field-of-view settings allowed by game
let minFOV = 80, maxFOV = 103

let sights = {
    Hip: {
        name: "Hip Fire",
        alias: "Hip",
        multiplier: 1,
        zoom: 1
    },
    Handgun: {
        name: "Handgun Ironsights",
        alias: "Handgun",
        multiplier: 1.11,
        zoom: 1.02
    },
    SMG: {
        name: "SMG Ironsights",
        alias: "SMG",
        multiplier: 1.23,
        zoom: 1.03
    },
    ELO: {
        name: "ELO",
        alias: "ELO",
        multiplier: 1.26,
        zoom: 1.04
    },
    Rifle: {
        name: "Rifle Ironsights",
        alias: "Rifle",
        multiplier: 1.39,
        zoom: 1.05
    },
    Holo: {
        name: "Holo",
        alias: "Holo",
        multiplier: 1.69,
        zoom: 1.06
    },
    ABR: {
        name: "ABR Stock",
        alias: "ABR",
        multiplier: 1.78,
        zoom: 1.07
    },
    "2x": {
        name: "2x Scope",
        alias: "2x",
        multiplier: 2.12,
        zoom: 1.12
    },
    "3x": {
        name: "3x Scope",
        alias: "Holo",
        multiplier: 3.32,
        zoom: 1.12
    },
    "4x": {
        name: "4x Scope",
        alias: "4x",
        multiplier: 4.40,
        zoom: 1.12
    },
    Sniper: {
        name: "Sniper Scope",
        alias: "Sniper",
        multiplier: 7,
        zoom: 1.13
    }
}

const getCm360FromGameSettings = (settings, gameSetting, baseDots) => {
    let result = settings.dpi.actual / 2.54
    result = baseDots / result
    result /= gameSetting
    return result
}

const getInfo = (settings, options) => {
    let baseHFOV = parseFloat(options["FOV"])
    let desiredCm360 = getIdealCm360AtFOV(settings.sensitivity.actual, options["FOV"], "hor+")
    let sensitivity = getLinearSensitivity(baseDots, baseSetting, desiredCm360, settings.dpi.actual, minSens, maxSens, 2)
    let outputHipFire = getCm360FromGameSettings(settings, sensitivity, baseDots)
    let settingsJSON = [
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
    ]
    let outputJSON = []
    Object.keys(sights).map(key => {
        let sight = sights[key]
        let thisFOV = baseHFOV / sight.multiplier
        let thisVFOV = getVFOVFromHorizontalFOV(settings.monitor.width, settings.monitor.height, thisFOV)
        let zoom = sight.multiplier
        let idealCm360 = getIdealCm360AtFOV(settings.sensitivity.actual, thisFOV, "hor+")
        let output = outputHipFire * sight.multiplier
        outputJSON.push({
            name: sight.name,
            alias: sight.alias,
            fov: thisFOV,
            vfov: thisVFOV,
            zoom: getRounded(zoom, 2),
            cm360: output,
            ideal: idealCm360,
            variance: normalizeLowPercentage(idealCm360 / output - 1) * 100
        })
    })
    console.log(outputJSON)
    return {
        settings: settingsJSON,
        output: outputJSON,
        settingsHelp: <span>Settings taken from the beta. Subject to change before the game goes live.</span>,
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