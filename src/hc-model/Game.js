import gameData from './games/GameData'

class Game {
    constructor(gameJson) {
        Object.assign(this, gameJson);
    }

    getSettingForDCm = profile => {
        // Get 360 / (dpi * yaw)
        let calc = 360 / (profile.dPI * this.math.sensitivity.yaw)
        // Convert from inches to cm
        calc *= 2.54
        // Multiply if needed, in game
        calc *= this.math.sensitivity.multiplier
        // Divide by target cm/360
        return calc / profile.sensitivity
    }

    getIdealFOV = profile => {
        return this.math.fov.recommended
    }

    getName() {
        return(this.name + " test")
    }
}

export default Game;

// "overwatch": {
//     name: "Overwatch",
//     shortName: "Overwatch",
//     alias: "overwatch",
//     logo: "http://someurl.com/test.png",
//     math: {
//         fov: {
//             min: 50,
//             max: 103,
//             default: 103,
//             recommended: 103,
//             horizontal: true,
//             basedOnSD: false
//         },
//         sensitivity: {
//             min: 1,
//             max: 25,
//             default: 10,
//             linear: true,   // scale: 1 instead
//             multiplier: (10/3),
//             affectedByResolution: false,
//             affectedByFov: false,
//             rawInput: true,
//             accelerationPossible: true,
//             accelerationDefault: false,
//             yaw: 0.022
//         }
//     }