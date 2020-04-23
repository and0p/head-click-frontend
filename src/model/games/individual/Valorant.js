import {
  getRounded,
  normalizeLowPercentage,
  clamp,
  getPercentageOfBaseFOV,
  getIdealCm360AtFOV,
  getVFOVFromHorizontalFOV,
  getHorPlusFromVerticalFOV,
  baseHFOV
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
  sights.map(sight => {
    let fov = baseFov / sight.zoom
    let output = (baseDots * sight.zoom / sensitivity) / settings.dpi.actual * 2.54 / 100
    let idealCm360 = getIdealCm360AtFOV(settings.sensitivity.actual, fov, 'hor+')
    outputJSON.push({
      name: sight.name,
      alias: sight.alias,
      fov: fov,
      vfov: getVFOVFromHorizontalFOV(16, 9, fov),
      zoom: sight.zoom,
      cm360: output,
      ideal: idealCm360,
      variance: normalizeLowPercentage(idealCm360 / output - 1) * 100
    })
  })
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
  // Add the aspect ratio if relevant
  if(settings.monitor.height / settings.monitor.width != 0.5625) {
    outputSettings.push({
      name: '"Aspect Ratio Method"',
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
    "Video Settings": [
      {
        text: "Wait for Vertical Sync",
        value: "Disabled",
        note: false,
        info: "Performance boost and lag reduction, unless your computer is powerful enough.",
        critical: true
      },
      {
        text: "Motion Blur",
        value: "Disabled",
        note: false,
        info: "Makes scanning and target acquisition easier.",
        critical: false
      }
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