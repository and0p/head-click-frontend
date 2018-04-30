import * as stats from 'stats-lite'
import gaussian from 'gaussian'

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

export const emptyArray = []
for(let i = 0; i < 200; i++)
{
    emptyArray.push(0)
}

export const getRounded = (input, decimalPlaces) => parseFloat(input).toFixed(decimalPlaces)