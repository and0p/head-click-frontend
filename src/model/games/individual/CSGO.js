import { 
    getRounded,
    normalizeLowPercentage,
    clamp,
    getPercentageOfBaseFOV,
    getIdealCm360AtFOV,
    getVFOVFromHorizontalFOV,
    getHorPlusFromVerticalFOV,
    baseHFOV 
} from '../../../math'

let baseDots = 16364;    // at sensitivity 1.0
let baseVFOV = 73.74
let minSensitivity = 0.01;
let maxSensitivity = 7.5;

let sights = {
    Hip: {
        name: "Hip Fire",
        alias: "Hip",
        vfov: 73.74,
        zoomMod: 1
    },
    Aug: {
        name: "AUG | SG 553",
        alias: "AUG | SG",
        vfov: 34.56,
        zoomMod: 2
    },
    Zoom1: {
        name: "Sniper Zoom 1",
        alias: "Zoom 1",
        vfov: 30.54,
        zoomMod: 2.25
    },
    Zoom2: {
        name: "Sniper Zoom 2",
        alias: "Zoom 2",
        vfov: 11.28,
        zoomMod: 6
    },
    AWPZoom2: {
        name: "AWP Zoom 2",
        alias: "AWP",
        vfov: 7.51,
        zoomMod: 9
    }
}

const getSensitivity = (desiredCm360, dpi) => {
    let desiredDots = desiredCm360 / 2.54 * dpi
    return getRounded(clamp(baseDots / desiredDots, minSensitivity, maxSensitivity), 2)
}

const getInfo = (settings, options) => {
    // Build the result, looping over views and respective FOVs
    let outputJSON = []
    let sensitivity = getSensitivity(settings.sensitivity.actual, settings.dpi.actual)
    Object.keys(sights).map(key => {
        let sight = sights[key]
        let output = (baseDots * sight.zoomMod / sensitivity) / settings.dpi.actual * 2.54
        let zoom = baseVFOV / sight.vfov
        let idealCm360 = getIdealCm360AtFOV(settings.sensitivity.actual, sight.vfov, "vertical")
        outputJSON.push({
            name: sight.name,
            alias: sight.alias,
            fov: getHorPlusFromVerticalFOV(settings.monitor.width, settings.monitor.height, sight.vfov),
            vfov: sight.vfov,
            zoom: zoom,
            cm360: output,
            ideal: idealCm360,
            variance: normalizeLowPercentage(idealCm360 / output - 1) * 100
        })
    })
    return {
        settings: [
            {
                name: 'Sensitivity',
                subtext: 'Options ~ Keyboard And Mouse',
                value: sensitivity
            },
            {
                name: 'Zoom Sensitivity',
                subtext: 'Options ~ Keyboard And Mouse',
                value: 1.00
            },
            {
                name: 'Raw Input',
                subtext: 'Options ~ Keyboard And Mouse',
                value: "On"
            },
            {
                name: 'Mouse Acceleration',
                subtext: 'Options ~ Keyboard And Mouse',
                value: "Off"
            }
        ],
        output: outputJSON
    }
}

const CSGO = {
    name: "Counter-Strike: Global Offensive",
    shortName: "CS:GO",
    alias: "csgo",
    hasLogo: true,
    type: "tactical",
    settings: {
        "Video Settings": [
            {
                text: "Wait for Vertical Sync",
                value: "Disabled",
                note: false,
                info: "Performance boost and lag reduction, unless your computer is powerful enough.",
                critical: true
            },
            {
                text: "Motion Blur",
                value: "Disabled",
                note: false,
                info: "Makes scanning and target acquisition easier.",
                critical: false
            }
        ]
    },
    infoFunction: getInfo,
    outputFunction: (sensitivity, dpi, options) => getRounded(baseDots / sensitivity / dpi * 2.54, 2),
    defaultSensitivity: 1,
    sensitivityDecimalPoints: 2,
    overrides: {
        cm360: true,
        dpi: true,
        resolution: false
    },
    options: []
}

export default CSGO