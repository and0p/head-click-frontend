import Overwatch from './individual/Overwatch'
import Fortnite from './individual/Fortnite'
import R6Siege from './individual/R6Siege'
import PUBG from './individual/PUBG'
import CSGO from './individual/CSGO'
import BlackOps4 from './individual/BlackOps4';
import Destiny2 from './individual/Destiny2';
import Battlefield1 from './individual/Battlefield1';
import CSSource from './individual/CSSource';
import Valorant from './individual/Valorant'
import { RS2Vietnam } from './individual/RS2Vietnam';
import { runInThisContext } from 'vm';
import { Rust } from './individual/Rust';

const gameData = [
    CSGO,
    Fortnite,
    Overwatch,
    PUBG,
    R6Siege,
    BlackOps4,
    Destiny2,
    Battlefield1,
    CSSource,
    RS2Vietnam,
    Rust,
    Valorant
]

export const gameNamesByPopularity = [
    "valorant",
    "fortnite",
    "overwatch",
    "csgo",
    "r6siege",
    "pubg",
    "blackops4",
    "destiny2",
    "rust",
    "battlefield1",
    "rs2vietnam",
    "cssource"
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