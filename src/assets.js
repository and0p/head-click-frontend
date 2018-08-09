import React from 'react';

const asset_root = 'https://s3.amazonaws.com/head-click/public'

const img = {
    "headclick": {
        "logo_small": {
            "1x": asset_root + '/logo/headclick_small@1x.png',
            "1.5x": asset_root + '/logo/headclick_small@1_5x.png',
            "2x": asset_root + '/logo/headclick_small@2x.png',
        },
        "logo_white": {
            "1x": asset_root + '/logo/logo_white@1x.png',
            "1.5x": asset_root + '/logo/logo_white@1_5x.png',
            "2x": asset_root + '/logo/logo_white@2x.png',
        },
        "logo_dark": {
            "1x": asset_root + '/logo/logo_dark@1x.png',
            "1.5x": asset_root + '/logo/logo_dark@1_5x.png',
            "2x": asset_root + '/logo/logo_dark@2x.png',
        }
    },
    "splash": {
        "splash": {
            "1x": asset_root + '/splash/splash@1x.png',
            "1.5x": asset_root + '/splash/splash@1_5x.png',
            "2x": asset_root + '/splash/splash@2x.png',
        },
        "splash_dark": {
            "1x": asset_root + '/splash/splash_dark@1x.png',
            "1.5x": asset_root + '/splash/splash_dark@1_5x.png',
            "2x": asset_root + '/splash/splash_dark@2x.png',
        },
        "splash_mono": {
            "1x": asset_root + '/splash/splash_mono@1x.png',
            "1.5x": asset_root + '/splash/splash_mono@1_5x.png',
            "2x": asset_root + '/splash/splash_mono@2x.png',
        }
    },
    "wizard": {
        "mousepad_small": {
            "1x": asset_root + '/wizard/mousepad_small@1x.png',
            "1.5x": asset_root + '/wizard/mousepad_smallk@1_5x.png',
            "2x": asset_root + '/wizard/mousepad_small@2x.png',
        },
        "mousepad_medium": {
            "1x": asset_root + '/wizard/mousepad_medium@1x.png',
            "1.5x": asset_root + '/wizard/mousepad_mediumk@1_5x.png',
            "2x": asset_root + '/wizard/mousepad_medium@2x.png',
        },
        "mousepad_wide": {
            "1x": asset_root + '/wizard/mousepad_wide@1x.png',
            "1.5x": asset_root + '/wizard/mousepad_widek@1_5x.png',
            "2x": asset_root + '/wizard/mousepad_wide@2x.png',
        },
        "game_pace_tactical": {
            "1x": asset_root + '/wizard/tactical_game_pace@1x.png',
            "1.5x": asset_root + '/wizard/tactical_game_pace@1_5x.png',
            "2x": asset_root + '/wizard/tactical_game_pace@2x.png',
        },
        "game_pace_average": {
            "1x": asset_root + '/wizard/average_game_pace@1x.png',
            "1.5x": asset_root + '/wizard/average_game_pace@1_5x.png',
            "2x": asset_root + '/wizard/average_game_pace@2x.png',
        },
        "game_pace_twitchy": {
            "1x": asset_root + '/wizard/twitchy_game_pace@1x.png',
            "1.5x": asset_root + '/wizard/twitchy_game_pace@1_5x.png',
            "2x": asset_root + '/wizard/twitchy_game_pace@2x.png',
        },
        "monitor_select:": {
            "1x": asset_root + '/wizard/monitor_select@1x.png',
            "1.5x": asset_root + '/wizard/monitor_selecte@1_5x.png',
            "2x": asset_root + 'monitor_selecte@2x.png',
        }, 
    },
    "overwatch": {
        "logo": {
            "1x": asset_root + '/games/overwatch/logo/logo@1x.png',
            "1.5x": asset_root + '/games/overwatch/logo/logo@1_5x.png',
            "2x": asset_root + '/games/overwatch/logo/logo@2x.png',
        },
        "logo_big": {
            "1x": asset_root + '/games/overwatch/logo/logo_big@1x.png',
            "1.5x": asset_root + '/games/overwatch/logo/logo_big@1_5x.png',
            "2x": asset_root + '/games/overwatch/logo/logo_big@2x.png',
        },
        "logo_mini": {
            "1x": asset_root + '/games/overwatch/logo/logo_mini@1x.png',
            "1.5x": asset_root + '/games/overwatch/logo/logo_mini@1_5x.png',
            "2x": asset_root + '/games/overwatch/logo/logo_mini@2x.png',
        },
    },
    "pubg": {
        "logo": {
            "1x": asset_root + '/games/pubg/logo/logo@1x.png',
            "1.5x": asset_root + '/games/pubg/logo/logo@1_5x.png',
            "2x": asset_root + '/games/pubg/logo/logo@2x.png',
        },
        "logo_big": {
            "1x": asset_root + '/games/pubg/logo/logo_big@1x.png',
            "1.5x": asset_root + '/games/pubg/logo/logo_big@1_5x.png',
            "2x": asset_root + '/games/pubg/logo/logo_big@2x.png',
        },
        "logo_mini": {
            "1x": asset_root + '/games/pubg/logo/logo_mini@1x.png',
            "1.5x": asset_root + '/games/pubg/logo/logo_mini@1_5x.png',
            "2x": asset_root + '/games/pubg/logo/logo_mini@2x.png',
        },
    },
    "r6siege": {
        "logo": {
            "1x": asset_root + '/games/r6siege/logo/logo@1x.png',
            "1.5x": asset_root + '/games/r6siege/logo/logo@1_5x.png',
            "2x": asset_root + '/games/r6siege/logo/logo@2x.png',
        },
        "logo_big": {
            "1x": asset_root + '/games/r6siege/logo/logo_big@1x.png',
            "1.5x": asset_root + '/games/r6siege/logo/logo_big@1_5x.png',
            "2x": asset_root + '/games/r6siege/logo/logo_big@2x.png',
        },
        "logo_mini": {
            "1x": asset_root + '/games/r6siege/logo/logo_mini@1x.png',
            "1.5x": asset_root + '/games/r6siege/logo/logo_mini@1_5x.png',
            "2x": asset_root + '/games/r6siege/logo/logo_mini@2x.png',
        },
    },
    "fortnite": {
        "logo": {
            "1x": asset_root + '/games/fortnite/logo/logo@1x.png',
            "1.5x": asset_root + '/games/fortnite/logo/logo@1_5x.png',
            "2x": asset_root + '/games/fortnite/logo/logo@2x.png',
        },
        "logo_big": {
            "1x": asset_root + '/games/fortnite/logo/logo_big@1x.png',
            "1.5x": asset_root + '/games/fortnite/logo/logo_big@1_5x.png',
            "2x": asset_root + '/games/fortnite/logo/logo_big@2x.png',
        },
        "logo_mini": {
            "1x": asset_root + '/games/fortnite/logo/logo_mini@1x.png',
            "1.5x": asset_root + '/games/fortnite/logo/logo_mini@1_5x.png',
            "2x": asset_root + '/games/fortnite/logo/logo_mini@2x.png',
        },
    },
    "csgo": {
        "logo": {
            "1x": asset_root + '/games/csgo/logo/logo@1x.png',
            "1.5x": asset_root + '/games/csgo/logo/logo@1_5x.png',
            "2x": asset_root + '/games/csgo/logo/logo@1_5x.png',
        },
        "logo_big": {
            "1x": asset_root + '/games/csgo/logo/logo_big@1x.png',
            "1.5x": asset_root + '/games/csgo/logo/logo_big@1_5x.png',
            "2x": asset_root + '/games/csgo/logo/logo_big@1_5x.png',
        },
        "logo_mini": {
            "1x": asset_root + '/games/csgo/logo/logo_mini@1x.png',
            "1.5x": asset_root + '/games/csgo/logo/logo_mini@1_5x.png',
            "2x": asset_root + '/games/csgo/logo/logo_mini@1_5x.png',
        },
    },
    
}

class ResponsiveAsset extends React.Component {
    render() {
        if(img.hasOwnProperty(this.props.category) && img[this.props.category].hasOwnProperty(this.props.asset))
        {
            let srcset = img[this.props.category][this.props.asset]["1x"] + ", " + img[this.props.category][this.props.asset]["1.5x"] + " 1.5x," + img[this.props.category][this.props.asset]["2x"] + " 2x"
            return <img srcSet={srcset} src={img[this.props.category][this.props.asset].normal} className={this.props.className} />
        }
        else
        {
            return <div/>
        }
    }
}

const getResponsive = image => {
    if(img.hasOwnProperty(image))
    {
        let srcset = img[image].normal + ", " + img[image].double + "2x"
        return <img srcset={srcset} src={img[image].normal} />
    }
    else
    {
        return null
    }
}

export default ResponsiveAsset