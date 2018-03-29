export const getSettingForDCm = (game, profile, targetDCm) => {
    console.log(game)
    console.log(profile)
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

/*
    math: {
        fov: {
            min: 50,
            max: 103,
            default: 103,
            recommended: 103,
            horizontal: true,
            basedOnSD: false,
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
            accelerationDefault: false
        }
    }
*/