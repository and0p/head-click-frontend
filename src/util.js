import * as stats from 'stats-lite'
import gaussian from 'gaussian'

// ideal FOV W:H is 106:74 at 16:9 
export const baseFOV = 106.26
export const getPercentageOfBaseFOV = (fov) => {
    return fov / baseFOV
}

export const getIdealCm360AtFOV = (idealCm360, fov) => {
    return idealCm360 / getPercentageOfBaseFOV(fov)
}

export const getSettingForDCm = (game, profile, targetDCm) => {
    // Get 360 / (dpi * yaw)
    let calc = 360 / (profile.dPI * game.math.sensitivity.yaw)
    // Convert from inches to cm
    calc *= 2.54
    // Multiply if needed, in game
    calc *= game.math.sensitivity.multiplier
    // Divide by target cm/360
    return calc / targetDCm
}

export const isValid = (anything) => { return(anything != "undefined" && anything != null) }

export const isInArray = (arr, value) => {
    return (arr.indexOf(value) > -1)
}

export const replaceSettingsArrows = text => {
    return text.replace(/~/g, "→")
}

export const assetPath = 'file:///C:/Users/Andrew/Pictures/head.click/'

export const getRecommendedDpi = games => {
    return 42
}

export const getOverrideFromSettings = settings => {
    let j = { sensitivity: {}, dpi: {}, monitor: {} }
    if(isValid(settings))
    {
        j.sensitivity.actual = settings.sensitivity.actual
        j.dpi.actual = settings.dpi.actual
        j.monitor = { }
        Object.assign(j.monitor, settings.monitor)
    }
    else
    {
        j.sensitivity.actual = 34
        j.dpi.actual = 800
        j.monitor = { width: 1920, height: 1080 }
    }
    return j
}

export const normalizeLowPercentage = percentage => {
    if(percentage < 0.0005 && percentage > -0.0005)
        return 0
    else
        return Math.abs(percentage)
}

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const emptyArray = []
for(let i = 0; i < 200; i++)
{
    emptyArray.push(0)
}

export const getRounded = (input, decimalPlaces) => parseFloat(input).toFixed(decimalPlaces)