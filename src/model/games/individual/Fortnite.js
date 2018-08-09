import { getRounded, getVFOVFromHorizontalFOV, getIdealCm360AtFOV, normalizeLowPercentage, clamp } from '../../../math'
import React from 'react'

let baseDots = 64805;
let baseFOV = 80

let sights = {
    Hip: {
        name: "Hip Fire",
        alias: "Hip",
        hfov: 80,
        dots: 64805,
        zoom: 1
    },
    ADS: {
        name: "ADS",
        alias: "ADS",
        hfov: 80,
        dots: 64805,
        zoom: 1
    },
    Rifle: {
        name: "DMR",
        alias: "DMR",
        hfov: 40,
        dots: 129611,
        zoom: 2
    },
    Sniper: {
        name: "Sniper",
        alias: "Sniper",
        hfov: 15,
        dots: 345638,
        zoom: 5.333
    },
}

const getSensitivity = (idealCm360, dpi) => {
    return getRounded(clamp(sights.Hip.dots / (dpi / 2.54) / idealCm360 / 100, 0.01, 1), 3)
}

const getCm360FromGameSettings = (gameSetting, dpi, sight) => {
    let result = dpi / 2.54
    result = sight.dots / result
    result /= gameSetting
    return result / 100
}

const getInfo = (settings, options) => {
    // Build the result, looping over views and respective FOVs
    let outputJSON = []
    let idealBase = getIdealCm360AtFOV(settings.sensitivity.actual, 80)
    let sensitivity = getSensitivity(idealBase, settings.dpi.actual)
    let output = (baseDots / sensitivity) / settings.dpi.actual * 2.54
    Object.keys(sights).map(key => {
        let sight = sights[key]
        let output = getCm360FromGameSettings(sensitivity, settings.dpi.actual, sight)
        let idealCm360 = getIdealCm360AtFOV(settings.sensitivity.actual, sight.hfov)
        outputJSON.push({
            name: sight.name,
            alias: sight.alias,
            fov: sight.hfov,
            vfov: getVFOVFromHorizontalFOV(16, 9, sight.hfov),
            zoom: sight.zoom,
            cm360: output,
            ideal: idealCm360,
            variance: normalizeLowPercentage(idealCm360 / output - 1) * 100
        })
    })
    return {
        settings: [
            {
                name: 'Mouse Sensitivity',
                subtext: 'Settings ~ Game ~ Input',
                value: sensitivity
            },
            {
                name: 'Mouse ADS Sensitivity',
                subtext: 'Settings ~ Game ~ Input',
                value: getRounded(1, 2)
            },
            {
                name: 'Mouse Scope Sensitivity',
                subtext: 'Settings ~ Game ~ Input',
                value: getRounded(1, 2)
            },
        ],
        output: outputJSON,
        settingsHelp: <span>
            Fortnite has two major problems with setting mouse sensitivity:
            <ul>
                <li>You can no longer set it within the config file, as it's now stored in the cloud.</li>
                <li>The setting can be controlled one digit more finely than is displayed.</li>
            </ul>
            To elaborate on the second point, although the settings menu only shows mouse sensitivity rounded to two digits, ie 0.01 or 0.45, there's a hidden third digit that makes a big difference. If you drag the slider, you may notice that there are 5-10 pixels you need to move it (depending on resolution) before the visible value changes. These pixels actually make a difference.<p/>
            A blog post on managing this is incoming. For now, just try to pay attention to the range you can move the slider between two visible values, and leave it roughly where the third digit would be. For example, if the settings above indicate 0.050, slide along 0.04 until the pixel it flips over to 0.050. If you have 0.055, try to land it between 0.05 and 0.06. Alternatively, consider using a lower DPI, which will minimize the effect of the discrepency.
        </span>
    }
}

const Fortnite = {
    name: "Fortnite",
    shortName: "Fortnite",
    alias: "fortnite",
    hasLogo: false,
    type: "average",
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
    infoFunction: getInfo,
    settings: {
        "Video": [
            {
                text: "VSync",
                value: "Off",
                note: false,
                info: "Performance boost and lag reduction, unless your computer is powerful enough.",
                critical: true
            },
            {
                text: "View Distance",
                value: "Epic",
                note: false,
                info: "See farther.",
                critical: false
            },
            {
                text: "Motion Blur",
                value: "Disabled",
                note: false,
                info: "Makes scanning and target acquisition more easiler.",
                critical: false
            },
        ]
    },
    options: []
}

export default Fortnite