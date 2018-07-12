import { Validator } from 'jsonschema'

const v = new Validator();

const profileSchema = {
    "settings": {
        "monitor": {
            "required": true,
            "type": "array",
            "items": {"type": "string"},
            "minitems": 2,
            "maxItems": 2
        },
        "refreshRate": {"type": "integer", "required": true, "minimum": 30},
        "dpi": {
            "actual": {"type": "integer", "required": true,"minimum": 0},
            "recommended": {"type": "integer", "required": true,"minimum": 0}
        },
        "sensitivity": {
            "actual": {"type": "integer", "required": true,"minimum": 0},
            "recommended": {"type": "integer", "required": true,"minimum": 0}
        },
        "toggle": {
            "actual": {"type": "any", "required": false},
            "recommended": {"type": "any", "required": false}
        },
        "usingCustomMonitor": {"type": "boolean", "required": false }
    },
    "ownedGames": {
        "type": "array",
        "items": {"type": "string"},
        "uniqueItems": true,
        "required": true
    },
    "ready": {"type": "boolean", "required": true },
    "ownedGames": {
        "type": "array",
        "items": {"type": "string"},
        "uniqueItems": true,
        "required": true
    },
    "overrides": {"type": "object", "required": true},
    "options": {"type": "object", "required": true},
    "customMonitor": {
        "name": {"type": "string"},
        "width": {"type": "integer", "minimum": 0},
        "height": {"type": "integer", "minimum": 0},
        "aspectRatio": {"type": "string"},
        "recommendedDpi": {"type": "integer", "minimum": 400},
        "nonDescriptiveName": {"type": "boolean"},
        "common": {"type": "boolean"},
        "usable": {"type": "boolean"}
    }
}

export const validateProfile = profile => {
    // Returns true if profile submitted matches schem
    return v.validate(profile, profileSchema).valid
}