const monitorData = {
    "4:3": {
        "640x480": {
            name: "640x480",
            technicalName: "640x480",
            width: 640,
            height: 480,
            aspectRatio: "4:3",
            recommendedDpi: 400,
            nonDescriptiveName: false,
            common: false,
            usable: true
        },
        "800x600": {
            name: "800x600",
            technicalName: "800x600",
            width: 800,
            height: 600,
            aspectRatio: "4:3",
            recommendedDpi: 400,
            nonDescriptiveName: false,
            common: true,
            usable: true
        },
        "1024x768": {
            name: "1024x768",
            technicalName: "1024x768",           
            width: 1024,
            height: 768,
            aspectRatio: "4:3",
            recommendedDpi: 400,
            nonDescriptiveName: false,
            common: true,
            usable: true
        },
        "1280x960": {
            name: "1280x960",
            technicalName: "1280x960",
            width: 1280,
            height: 960,
            aspectRatio: "4:3",
            recommendedDpi: 800,
            nonDescriptiveName: false,
            common: true,
            usable: true
        },
        "1440x1080": {
            name: "1440x1080",
            technicalName: "1440x1080",
            width: 1440,
            height: 1080,
            aspectRatio: "4:3",
            recommendedDpi: 800,
            nonDescriptiveName: false,
            common: false,
            usable: true
        },
        "1600x1200": {
            name: "1600x1200",
            technicalName: "1600x1200",
            width: 1600,
            height: 1200,
            aspectRatio: "4:3",
            recommendedDpi: 1200,
            nonDescriptiveName: false,
            common: false,
            usable: true
        }
    },
    "16:9": {
        "720p": {
            name: "720p",
            technicalName: "1280x720 (720p)",
            width: 1280,
            height: 720,
            aspectRatio: "16:9",
            recommendedDpi: 800,
            nonDescriptiveName: true,
            common: false,
            usable: true
        },
        "1366x768": {
            name: "1366x768",
            technicalName: "1366x768",
            width: 1366,
            height: 768,
            aspectRatio: "16:9",
            recommendedDpi: 800,
            nonDescriptiveName: false,
            common: false,
            usable: true
        },
        "1600x900": {
            name: "1600x900",
            technicalName: "1600x900",
            width: 1600,
            height: 900,
            aspectRatio: "16:9",
            recommendedDpi: 800,
            nonDescriptiveName: false,
            common: false,
            usable: true
        },
        "1080p": {
            name: "1080p",
            technicalName: "1920x1080 (1080p)",
            width: 1920,
            height: 1080,
            aspectRatio: "16:9",
            recommendedDpi: 800,
            nonDescriptiveName: true,
            common: true,
            usable: true
        },
        "2K (WQHD)": {
            name: "2K (WQHD)",
            technicalName: "2560x1440 (2K)",
            width: 2560,
            height: 1440,
            aspectRatio: "16:9",
            recommendedDpi: 1200,
            nonDescriptiveName: true,
            common: true,
            usable: true
        },
        "4K (UHD-1)": {
            name: "4K (UHD-1)",
            technicalName: "3840x2160 (4K)",
            width: 3840,
            height: 2160,
            aspectRatio: "16:9",
            recommendedDpi: 1600,
            nonDescriptiveName: true,
            common: true,
            usable: true
        }
    },
    "16:10": {
        "1280x800": {
            name: "1280x800",
            technicalName: "1280x800",
            width: 1280,
            height: 800,
            aspectRatio: "16:10",
            recommendedDpi: 800,
            nonDescriptiveName: false,
            common: false,
            usable: true
        },
        "1440x900": {
            name: "1440x900",
            technicalName: "1440x900",
            width: 1440,
            height: 900,
            aspectRatio: "16:10",
            recommendedDpi: 800,
            nonDescriptiveName: false,
            common: true,
            usable: true
        },
        "1680x1050": {
            name: "1680x1050",
            technicalName: "1680x1050",
            width: 1680,
            height: 1050,
            aspectRatio: "16:10",
            recommendedDpi: 800,
            nonDescriptiveName: false,
            common: true,
            usable: true
        },
        "1920x1200": {
            name: "1920x1200",
            technicalName: "1920x1200",
            width: 1920,
            height: 1200,
            aspectRatio: "16:10",
            recommendedDpi: 1200,
            nonDescriptiveName: false,
            common: true,
            usable: true
        },
        "2560x1600": {
            name: "2560x1600",
            technicalName: "2560x1600",
            width: 2560,
            height: 1600,
            aspectRatio: "16:10",
            recommendedDpi: 1600,
            nonDescriptiveName: false,
            common: false,
            usable: true
        }
    },
    "21:9": {
        "2560x1080": {
            name: "2560x1080",
            technicalName: "2560x1080",
            width: 2560,
            height: 1080,
            aspectRatio: "21:9",
            recommendedDpi: 1200,
            nonDescriptiveName: false,
            common: true,
            usable: true
        },
        "3440x1440": {
            name: "3440x1440",
            technicalName: "3440x1440",
            width: 3440,
            height: 1440,
            aspectRatio: "21:9",
            recommendedDpi: 1600,
            nonDescriptiveName: false,
            common: true,
            usable: true
        }
    }
}

export const customMonitor = {
    name: "Custom",
    width: 0,
    height: 0,
    aspectRatio: "N/A",
    recommendedDpi: "N/A",
    nonDescriptiveName: true,
    common: true,
    usable: false
}

export default monitorData