import { assetPath, emptyArray } from '../util'
import * as stats from 'stats-lite'
import gaussian from 'gaussian'

class Game {
    constructor(gameJson) {
        Object.assign(this, gameJson);
    }

    getSettingForDCm = profile => {
        // Get 360 / (dpi * yaw)
        let calc = 360 / (profile.dpi.actual * this.math.sensitivity.yaw)
        // Convert from inches to cm
        calc *= 2.54
        // Multiply if needed, in game
        calc *= this.math.sensitivity.multiplier
        // Divide by target cm/360
        return calc / profile.sensitivity.actual
    }

    getIdealFOV = profile => {
        return this.math.fov.recommended
    }

    getName() {
        return(this.name + " test")
    }

    getAssetPath() {
        return assetPath + 'games/' + this.alias + '/'
    }

    getPercentileArray = type => {
        if(this.stats.hasOwnProperty(type))
        {
            let stats = this.stats[type]
            if(stats.processed)
            {
                return stats.normalizedArray
            }
            else
            {
                
            }
            let data = []
            let dist = gaussian(stats.mean())
        }
        else
            return emptyArray
    }
}

export default Game;