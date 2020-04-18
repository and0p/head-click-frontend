import * as stats from 'stats-lite'
import gaussian from 'gaussian'
import { games } from './model/HcModel'
import passwordValidator from 'password-validator'

const recommendationVars = {
  'mousePad': {
    'small': 20,
    'medium': 28,
    'wide': 36
  },
  'gamePace': {
    'twitchy': 0.8,
    'average': 1,
    'tactical': 1.2
  },
  'tryhard': {
    'casual': 1,
    'pro': 1.1,
    'tryhard': 1.2
  },
}

export const getTypicalGameStyle = profile => {
  // Return average if no games are owned
  if (profile.ownedGames.length < 1)
    return "average"
  // Otherwise count tactical as 0 ... twitchy as 1
  let a = 0
  profile.ownedGames.forEach(gameAlias => {
    let game = games[gameAlias]
    if (game != undefined && game != null) {
      if (game.type == "average")
        a += 0.5
      else if (game.type == "twitchy")
        a += 1
    }
  })
  // Divide by number of owned games
  a = (a * 1.0000) / profile.ownedGames.length
  console.log(a)
  // See which third it falls into
  if (a < 0.25)
    return "tactical"
  else if (a >= 0.25 && a <= 0.75)
    return "average"
  else
    return "twitchy"
}

export const recommendSensitivity = profile => {
  let rec = recommendationVars["mousePad"][profile.settings.mousePadSize]
  let gamePaceMultiplier = recommendationVars["gamePace"][profile.settings.typicalGamePace]
  let tryhardMultiplier = recommendationVars["tryhard"][profile.settings.tryhardFactor]
  rec = Math.round(rec * gamePaceMultiplier * tryhardMultiplier)
  if (profile.settings.tryhardFactor == "casual" && rec > 34)
    rec = 34
  else if (rec < 20)
    rec = 20
  return rec
}

// ideal FOV W:H is 106:74 at 16:9 
export const baseFOV = 106.26
export const getPercentageOfBaseFOV = (fov) => {
  return fov / baseFOV
}

export const getIdealCm360AtFOV = (idealCm360, fov) => {
  return idealCm360 / getPercentageOfBaseFOV(fov)
}

export const getSettingForDCm = (game, profile, targetDCm) => {
  // Get 360 / (dpi * yaw)
  let calc = 360 / (profile.dPI * game.math.sensitivity.yaw)
  // Convert from inches to cm
  calc *= 2.54
  // Multiply if needed, in game
  calc *= game.math.sensitivity.multiplier
  // Divide by target cm/360
  return calc / targetDCm
}

export const isValid = (anything) => { return (anything != "undefined" && anything != null) }

export const isInArray = (arr, value) => {
  return (arr.indexOf(value) > -1)
}

export const replaceSettingsArrows = text => {
  return text.replace(/~/g, "→")
}

export const assetPath = 'file:///C:/Users/Andrew/Pictures/head.click/'

export const getRecommendedDpi = games => {
  return 40
}

export const getOverrideFromSettings = settings => {
  let j = { sensitivity: {}, dpi: {}, monitor: {} }
  if (isValid(settings)) {
    j.sensitivity.actual = settings.sensitivity.actual
    j.dpi.actual = settings.dpi.actual
    j.monitor = {}
    Object.assign(j.monitor, settings.monitor)
  }
  else {
    j.sensitivity.actual = 34
    j.dpi.actual = 800
    j.monitor = { width: 1920, height: 1080 }
  }
  return j
}

export const normalizeLowPercentage = percentage => {
  if (percentage < 0.0005 && percentage > -0.0005)
    return 0
  else
    return Math.abs(percentage)
}

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const emptyArray = []
for (let i = 0; i < 200; i++) {
  emptyArray.push(0)
}

export const getRounded = (input, decimalPlaces) => parseFloat(input).toFixed(decimalPlaces)

var schema = new passwordValidator();
schema
  .is().min(8)                                    // Minimum length 8
  .is().max(64)                                   // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits()                                 // Must have digits
  .has().symbols()                                // Must have symbols
  .has().not().spaces()                           // Should not have spaces
//.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

export const checkPassword = password => {
  password = '' + password
  if (password.length < 8)
    return "Too short"
  let issues = schema.validate(password, { list: true })
  // Check for critical errors, or more than one non-critical
  if (issues.includes("min") || issues.includes("max") || issues.includes("spaces"))
    return "Invalid"
  else if (issues.length > 1)
    return "Too weak"
  else
    return ""
}

export const profileHasValidMonitor = profile => {
  if (profile.settings.monitor
    && profile.settings.monitor != "undefined"
    && !profile.settings.usingCustomMonitor) {
    return true;
  }
  else if (profile.settings.usingCustomMonitor) {
    return parseInt(profile.customMonitor.width) >= 640 && parseInt(profile.customMonitor.height) >= 480;
  }
  else {
    return false; 
  }
}