import React from 'react'
import { getRounded, normalizeLowPercentage, clamp, getIdealCm360AtFOV, getVFOVFromHorizontalFOV, getHorPlusFromVerticalFOV } from '../../../math'

let baseHipDots = 1570796
let minConfigSensitivity = -0.0049, maxConfigSensitivity = 1
let minGameSensitivity = 0, maxGameSensitivity = 100
let b = 0.00003183003, m = 0.0063659966

const fovs = {
    "1x": 55.00,
    "1.25x": 45.20,
    "1.5x": 38.30,
    "2x": 29.20,
    "2.5x": 23.50,
    "3x": 19.70,
    "3.5x": 16.90,
    "4x": 14.80,
    "5x": 11.90,
    "6x": 9.90,
    "8x": 7.45,
    "10x": 5.95
}

const getSensitivityForConfigFile = (idealCm360, settings) => {
    // 1/dots = m*sens + b
    let idealDots = idealCm360 / 2.54 * settings.dpi.actual
    let y = 1/idealDots - b
    let sens = y / m
    return sens
}

const convertConfigToInGame = (configSensitivity) => {
    // 0 = 0%, 0.15 = 100%, or config file * 666.6666667
    return getRounded(clamp(configSensitivity * 666.6666667, 0, 100), 0)
}

const getCm360FromConfig = (settings, sensitivity) => {
    let dots = Math.pow((m*sensitivity+b), -1)
    return getRounded(dots / settings.dpi.actual * 2.54, 0)
}

// Assumes config file sensitivity
const getCm360FromGame = (settings, sensitivity) => {
    return getCm360FromConfig(settings, sensitivity / 666.6666667)
}

const getCoefficient = settings => {
    return getRounded(settings.monitor.width / settings.monitor.height * 100, 0)
}

// See different between standard 55 FOV and custom
const getFOVScale = fov => {
    return fov / fovs["1x"]
}

const generateConfigFile = (settings, sensitivity, desiredFOV) => {
    let config = "GameTime.MaxVariableFps 200\nRenderDevice.VSyncEnable 0\nRenderDevice.TripleBufferingEnable 0\nRenderDevice.RenderAheadLimit 0\nWorldRender.MotionBlurEnable 0\nWorldRender.MotionBlurMax 0\n"
    config += "GstInput.MouseSensitivity " + getRounded(sensitivity, 6) +"\nGstRender.FieldOfViewVertical " + desiredFOV
    return config.split('\n').map ((item, i) => <p key={i}>{item}</p>)
}

const configInfo = <span>Navigate to <b>%USERPROFILE%\Documents\Battlefield 1\settings</b> and update the file <b>PROFSAVE_profile_synced</b> to include the following:</span>

const getInfo = (settings, options) => {
    // Get the user-specified FOV
    let fov = options["V.FOV"]
    let idealCm360 = getIdealCm360AtFOV(settings.sensitivity.actual, fov, "vertical")
    // Get the sensitivity setting using config or in-game
    let usingConfigFile = options["Method"] == "Config File"
    let sensitivity = getSensitivityForConfigFile(idealCm360, settings)
    // Get the in-game as well
    let inGameSensitivity = convertConfigToInGame(sensitivity)
    // Get the settings to use
    let settingsJSON = []
    let outputJSON = []
    let settingsHelp = null
    if(usingConfigFile)
    {
        settingsJSON = [{
            name: 'Config File',
            subtext: '',
            value: 'See below'
        }]
    }
    else
    {
        settingsJSON = [
            {
                name: 'Soldier Mouse Sensitivity',
                subtext: 'Settings ~ Control ~ Basic',
                value: '' + inGameSensitivity + '%'
            },
            {
                name: 'Raw Mouse Input',
                subtext: 'Settings ~ Control ~ Basic',
                value: "ON"
            },
            {
                name: 'Soldier Zoom Sensitivity',
                subtext: 'Settings ~ Control ~ Basic',
                value: '100%'
            },
            {
                name: 'Soldier Zoom Sensitivity - All',
                subtext: 'Settings ~ Control ~ Advanced',
                value: '100%'
            },
            {
                name: 'Uniform Soldier Aiming',
                subtext: 'Settings ~ Control ~ Advanced',
                value: 'ON'
            },
            {
                name: 'Coefficient',
                subtext: 'Settings ~ Control ~ Advanced',
                value: getCoefficient(settings) + '%'
            },
        ]
    }
    // Compile output
    let baseActualCm = usingConfigFile ? getCm360FromConfig(settings, sensitivity) : getCm360FromGame(settings, inGameSensitivity)
    let baseFovModifier = getFOVScale(fov)
    Object.keys(fovs).map(key => {
        let thisFOV = key == "1x" ? fov : fovs[key] * (baseFovModifier + (55 / fovs[key] / 100))
        let thisIdealCm360 = getIdealCm360AtFOV(settings.sensitivity.actual, thisFOV, "vertical")
        let thisZoom = fov / thisFOV
        console.log(thisZoom)
        let thisActualCm360 = baseActualCm * thisZoom
        outputJSON.push({
            name: key == "1x" ? "Hipfire" : key,
            alias: key,
            fov: getHorPlusFromVerticalFOV(settings.monitor.width, settings.monitor.height, thisFOV),
            vfov: thisFOV,
            zoom: getRounded(thisZoom, 2),
            cm360: thisActualCm360,
            ideal: thisIdealCm360,
            variance: normalizeLowPercentage(thisIdealCm360 / thisActualCm360 - 1) * 100
        })
    })
    return {
        settings: settingsJSON,
        settingsHelp: usingConfigFile ? <span>{configInfo}<br/><br/>{generateConfigFile(settings, sensitivity, fov)}</span> : null,
        output: outputJSON
    }
}

const Battlefield1 = {
        name: "Battlefield 1",
        shortName: "Battlefield 1",
        alias: "battlefield1",
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
                name: "V.FOV",
                type: "slider",
                min: 60,
                max: 90,
                step: 1,
                recommended: 74,
                default: 74,
            }
        ]
}

export default Battlefield1