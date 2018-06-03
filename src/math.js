import * as stats from 'stats-lite'
import gaussian from 'gaussian'

export const baseFOV = 106.26   // CSGO 16:9, used as base for desired cm/360
const radian = Math.PI / 180

const toRadians = angle  => { return angle * (Math.PI / 180) }
const toDegrees = angle => { return angle * (180 / Math.PI) }

// Get percentage of input FOV of base CS:GO FOV
export const getPercentageOfBaseFOV = (fov) => {
    return fov / baseFOV
}

// Get ideal cm/360 based on FOV. If 48 at 106.26, should be 24 at 53.12, etc
export const getIdealCm360AtFOV = (idealCm360, fov) => {
    return idealCm360 / getPercentageOfBaseFOV(fov)
}

// Get HFOV from VFOV
export const getHorPlusFromVerticalFOV = (width, height, vfov) => {
    return toDegrees(2 * Math.atan(Math.tan(toRadians(vfov) / 2) * (width / height)))
}

export const getRounded = (input, decimalPlaces) => parseFloat(input).toFixed(decimalPlaces)

export const normalizeLowPercentage = percentage => {
    if(percentage < 0.0005 && percentage > -0.0005)
        return 0
    else
        return Math.abs(percentage)
}

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)