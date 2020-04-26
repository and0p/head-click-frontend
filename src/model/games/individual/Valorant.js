import {
  getRounded,
  normalizeLowPercentage,
  clamp,
  getIdealCm360AtFOV,
  getVFOVFromHorizontalFOV,
  getHorPlusFromVerticalFOV,
  baseHFOV,
  aspectRatioRelativeToWidescreen
} from '../../../math'

let baseDots = 513226;    // at sensitivity 0.001
let baseFov = 103
let minSensitivity = 0.01;
let maxSensitivity = 10;

let sights = [
  {
    name: "Hip Fire",
    alias: "Hip",
    zoom: 1
  },
  {
    name: "SMG/LMG",
    alias: "SMG/LMG",
    zoom: 1.15
  },
  {
    name: "Assault Rifle",
    alias: "Rifle",
    zoom: 1.25
  },
  {
    name: "Guardian",
    alias: "Guardian",
    zoom: 1.5
  },
  {
    name: "Marshall",
    alias: "1x",
    zoom: 2.5
  },
  {
    name: "Operator 2x",
    alias: "2x",
    zoom: 5
  },
]

const getSensitivity = (desiredCm360, dpi) => {
  let desiredDots = desiredCm360 / 2.54 * dpi
  return getRounded(clamp(baseDots / desiredDots / 100, minSensitivity, maxSensitivity), 3)
}

const getInfo = (settings, options) => {
  // Build the result, looping over views and respective FOVs
  let outputJSON = []
  let idealHip = getIdealCm360AtFOV(settings.sensitivity.actual, baseFov, 'hor+')
  let sensitivity = getSensitivity(idealHip, settings.dpi.actual)

  // See if the user is using fill at a non-standard aspect ratio
  let relativeAspect = aspectRatioRelativeToWidescreen(settings.monitor.width, settings.monitor.height)
  let adjustedHFov = baseFov;
  let adjustedVFov = getVFOVFromHorizontalFOV(16, 9, baseFov)
  if (options["Aspect Ratio Method"] == "Fill") {
    if (relativeAspect > 1) {
      // 21:9, etc, cropping vfov
      adjustedVFov /= relativeAspect
    }
    else if (relativeAspect < 1) {
      // 4:3, etc, cropping hfov
      adjustedHFov *= relativeAspect;
    }
  }

  // Output each sight
  sights.map(sight => {
    let output = (baseDots * sight.zoom / sensitivity) / settings.dpi.actual * 2.54 / 100
    let idealCm360 = getIdealCm360AtFOV(settings.sensitivity.actual, baseFov / sight.zoom, 'hor+')
    outputJSON.push({
      name: sight.name,
      alias: sight.alias,
      fov: adjustedHFov / sight.zoom,
      vfov: adjustedVFov / sight.zoom,
      zoom: sight.zoom,
      cm360: output,
      ideal: idealCm360,
      variance: normalizeLowPercentage(idealCm360 / output - 1) * 100
    })
  })

  // Output suggested settings, adding the aspect ratio if relevant
  let outputSettings = [
    {
      name: 'Sensitivity: Aim',
      subtext: 'Settings ~ Mouse',
      value: sensitivity
    },
    {
      name: 'Scoped Sensitivity Multiplier',
      subtext: 'Settings ~ Mouse',
      value: 1.00
    },
  ]
  if (settings.monitor.height / settings.monitor.width != 0.5625) {
    outputSettings.push({
      name: 'Aspect Ratio Method',
      subtext: 'Settings ~ Video',
      value: options["Aspect Ratio Method"]
    })
  }

  return {
    settings: outputSettings,
    output: outputJSON
  }
}

const Valorant = {
  name: "VALORANT",
  shortName: "VALORANT",
  alias: "valorant",
  hasLogo: true,
  type: "tactical",
  settings: {
    "Video - General": [
      {
        text: "Limit FPS Always",
        value: "Off",
        note: false,
        info: "Aim and reaction times improve at higher FPS.",
        critical: true
      },
    ],
    "Video - Graphics Quality": [
      {
        text: "VSync",
        value: "Off",
        note: false,
        info: "Vsync improves graphical fidelity but hinders response time on all but the most powerful systems.",
        critical: true
      },
    ]
  },
  infoFunction: getInfo,
  getSensitivity: getSensitivity,
  getCm360: (sensitivity, dpi, options) => baseDots / sensitivity / dpi * 2.54 / 100,
  defaultSensitivity: 1,
  sensitivityDecimalPoints: 2,
  overrides: {
    cm360: true,
    dpi: true,
    resolution: false
  },
  options: [
    {
      name: "Aspect Ratio Method",
      type: "buttons",
      values: [
        "Letterbox",
        "Fill"
      ],
      default: "Letterbox",
      recommended: "Letterbox"
    },
  ]
}

export default Valorant