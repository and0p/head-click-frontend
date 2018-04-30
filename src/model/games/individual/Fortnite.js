import { getRounded } from '../../../util'

let baseDots = 64805;

const getSensitivity = profile => {
    return baseDots / (profile.dpi.actual / 2.54) / profile.sensitivity.actual
}

const getInfo = profile => {
    return [
        {
            name: 'Sensitivity',
            icon: 'settings_ethernet',
            value: "." + getRounded(getSensitivity(profile), 0).padStart(2, '0'),
            color: 'purple'
        },
        {
            name: "FOV",
            icon: 'videocam',
            value: 103,
            color: 'blue'
        }
    ]
}

const Fortnite = {
    name: "Fortnite",
    shortName: "Fortnite",
    alias: "fortnite",
    hasLogo: false,
    math: {
        fov: {
            min: 60,
            max: 90,
            default: 90,
            recommended: 90,
            horizontal: true,
            basedOnSD: false
        },
        sensitivity: {
            min: 1,
            max: 25,
            default: 10,
            linear: true,   // scale: 1 instead?
            multiplier: 1,
            affectedByResolution: false,
            affectedByFov: false,
            rawInput: true,
            accelerationPossible: false,
            accelerationDefault: false,
            yaw: 0.022
        },
        recommended: {
            ideal: 34,
            min: 15,
            max: 46
        }
    },
    infoFunction: getInfo,
    settings: {
        optimization: [],
        gameplay: []
    }
}

export default Fortnite