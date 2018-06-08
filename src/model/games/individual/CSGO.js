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
let idealFOV = 90;

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
    let output = (baseDots / sensitivity) / settings.dpi.actual * 2.54
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
    hasLogo: false,
    math: {
        fov: {
            min: 60,
            max: 90,
            default: 90,
            recommended: 90,
            horizontal: true,
            basedOnSD: false
        },
        sensitivity: {
            min: 1,
            max: 25,
            default: 10,
            linear: true,   // scale: 1 instead?
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
            min: 15,
            max: 46
        }
    },
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
                info: "Makes targets easier to spot in the wild.",
                critical: true
            }
        ]
    },
    infoFunction: getInfo,
    overrides: {
        cm360: true,
        dpi: true,
        resolution: false
    },
}

export default CSGO