import * as stats from 'stats-lite'
import gaussian from 'gaussian'

export const baseHFOV = 106.26   // CSGO 16:9, used as base for desired cm/360
export const baseVFOV = 73.74
const radian = Math.PI / 180

const toRadians = angle  => { return angle * (Math.PI / 180) }
const toDegrees = angle => { return angle * (180 / Math.PI) }

// Get percentage of input FOV of base CS:GO FOV
export const getPercentageOfBaseFOV = (fov, method = "hor+") => {
    return fov / baseHFOV
}

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

export const getRounded = (input, decimalPlaces) => parseFloat(input).toFixed(decimalPlaces)

export const normalizeLowPercentage = percentage => {
    if(percentage < 0.0005 && percentage > -0.0005)
        return 0
    else
        return Math.abs(percentage)
}

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)