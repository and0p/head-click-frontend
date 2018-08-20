import Overwatch from './individual/Overwatch'
import Fortnite from './individual/Fortnite'
import R6Siege from './individual/R6Siege'
import PUBG from './individual/PUBG'
import CSGO from './individual/CSGO'
import BlackOps4 from './individual/BlackOps4';
import Destiny2 from './individual/Destiny2';

const gameData = [
    CSGO,
    Fortnite,
    Overwatch,
    PUBG,
    R6Siege,
    BlackOps4,
    Destiny2
]

export const gameNamesByPopularity = [
    "fortnite",
    "pubg",
    "overwatch",
    "blackops4",
    "csgo",
    "r6siege",
    "destiny2"
]

// Add test games
// for (var i = 0; i < 40; i++) {
//     let testGame = {
//         name: "Test Game " + i,
//         shortName: "Test " + i,
//         alias: "test" + i,
//         hasLogo: false,
//         math: {
//             fov: {
//                 min: 60,
//                 max: 90,
//                 default: 90,
//                 recommended: 90,
//                 horizontal: true,
//                 basedOnSD: false
//             },
//             sensitivity: {
//                 min: 1,
//                 max: 25,
//                 default: 10,
//                 linear: true,   // scale: 1 instead?
//                 multiplier: 1,
//                 affectedByResolution: false,
//                 affectedByFov: false,
//                 rawInput: true,
//                 accelerationPossible: false,
//                 accelerationDefault: false,
//                 yaw: 0.022
//             }
//         },
//         settings: {
//             optimization: [],
//             gameplay: []
//         }
//     }
//     gameData.push(testGame);
//     gameNamesByPopularity.push(testGame.alias)
// }

// →►

export default gameData