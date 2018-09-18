import * as stats from 'stats-lite'
import gaussian from 'gaussian'

export const baseHFOV = 106.26   // CSGO 16:9, used as base for desired cm/360
export const baseVFOV = 73.74
const radian = Math.PI / 180

const toRadians = angle  => { return angle * (Math.PI / 180) }
const toDegrees = angle => { return angle * (180 / Math.PI) }

// Get ideal cm/360 based on FOV. If 48 at 106.26, should be 24 at 53.12, etc
export const getIdealCm360AtFOV = (idealCm360, fov, method = "hor+") => {
    switch(method) {
        case "hor+":
            return idealCm360 / (fov / baseHFOV)
        case "vertical":
            return idealCm360 / (fov / baseVFOV)
        default: 
            return idealCm360 / (fov / baseVFOV)
    }
}

// Get HFOV from VFOV
export const getHorPlusFromVerticalFOV = (width, height, vfov) => {
    return toDegrees(2 * Math.atan(Math.tan(toRadians(vfov) / 2) * (width / height)))
}
export const getVFOVFromHorizontalFOV = (width, height, hfov) => {
    return toDegrees(2 * Math.atan(Math.tan(toRadians(hfov) / 2) * (height / width)))
}

export const getLinearSensitivity = (baseDots, baseSetting, desiredCm360, dpi, min, max, decimalCount, divisor = 1)  => {
    // Get the desired dots, which is the desired cm360 / centimeters-per-inch * the user's DPI
    let desiredDots = desiredCm360 / 2.54 * dpi
    // Normalize the number of dots per 360 at the game's lowest setting to 1.0
    // So if the lowest setting in game is 0.1 and the dots per 360 at that setting is 10,000, it will be 1,000 at the setting of 1.0
    let baseDotsNormalized = baseDots * (1 / baseSetting)
    // Get the exact, ideal in-game sensitivity
    let sensitivity = baseDots / desiredDots
    // Clamp to the allowable range and round up to allowed accuracy
    return getRounded(clamp(sensitivity / divisor, min, max), decimalCount)
}

export const getLinearOutput = (baseDots, baseSetting, userSetting, dpi) => {

}

export const getRounded = (input, decimalPlaces) => parseFloat(input).toFixed(decimalPlaces)

export const normalizeLowPercentage = percentage => {
    if(percentage < 0.0005 && percentage > -0.0005)
        return 0
    else
        return Math.abs(percentage)
}

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)