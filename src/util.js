import * as stats from 'stats-lite'
import gaussian from 'gaussian'

// ideal FOV W:H is 106:74 at 16:9 
export const baseFOV = 106
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
    if(games.length > 0)
    {
        // Get average from all games
        let allRecommended = []
        games.forEach(game => {
            allRecommended.push(game.math.recommended.ideal)
        })
        return stats.mean(allRecommended)
    }
    else
    {
        return 0
    }
}

export const getOverrideFromSettings = settings => {
    let j = { sensitivity: {}, dpi: {}, monitor: {} }
    j.sensitivity.actual = settings.sensitivity.actual
    j.dpi.actual = settings.dpi.actual
    j.monitor = {}
    Object.assign(j.monitor, settings.monitor)
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