const HcModel = {
    monitors: {
        "640x480": {
            name: "640x480",
            width: 640,
            height: 480,
            aspectRatio: "4:3",
            recommendedDpi: 400
        },
        "800x600": {
            name: "800x600",
            width: 800,
            height: 600,
            aspectRatio: "4:3",
            recommendedDpi: 400
        },
        "1080p": {
            name: "1080p",
            width: 1920,
            height: 1080,
            aspectRatio: "16:9",
            recommendedDpi: 800
        }
    },
    refreshRates: [
        60, 75, 120, 144
    ],
    mice: {
        "Logitech MX 400": {
            name: "Logitech MX 400",
            modelName: "MX 400",
            dynamicDpi: true,
            minDpi: 400,
            maxDpi: 1600,
            brand: "Logitech",
            image: "http://someurl.com/test.png"
        }
    },
    brands: {
        "Logitech": {
            name: "Logitech",
            logo: "http://someurl.com/test.png"
        }
    },
    games: {
        "overwatch": {
            name: "Overwatch",
            shortName: "OverWatch",
            alias: "overwatch",
            logo: "http://someurl.com/test.png",
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
                    accelerationDefault: false,
                    yaw: 0.022
                }
            }
        },
        "r6siege": {
            name: "Rainbow Six Siege",
            shortName: "R6 Siege",
            alias: "r6siege",
            logo: "http://someurl.com/test.png",
            math: {
                fov: {
                    min: 60,
                    max: 90,
                    default: 90,
                    recommended: 90,
                    horizontal: true,
                    basedOnSD: false,
                },
                sensitivity: {
                    min: 1,
                    max: 25,
                    default: 10,
                    linear: true,   // scale: 1 instead
                    multiplier: 1,
                    affectedByResolution: false,
                    affectedByFov: false,
                    rawInput: true,
                    accelerationPossible: false,
                    accelerationDefault: false,
                    yaw: 0.022
                }
            }
        },
    }
}

export default HcModel;