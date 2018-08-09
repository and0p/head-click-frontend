import React from 'react'
import Icon from '@material-ui/core/Icon'

export const dots = ".................................................................................................................................................................."
export const cm360 = "cm/360°"

const copy = {
    en: {
        technical: {
            cm360: "cm/360°"
        },
        splash: {
            tagline: "One sensitivity for all your games",
            feature1: {
                primary: "FIND",
                secondary: "Find the mouse sensitivity that's right for you.",
                verbose:  "Find the mouse sensitivity that's right for you using our profiler."
            },
            feature2: {
                primary: "KEEP",
                secondary: "Keep it consistent across all your games.",
                verbose:  "Keep it consistent across all your games with customized settings."
            },
            feature3: {
                primary: "COMPARE",
                secondary: "Compare your settings to pros.",
                verbose: "Compare your settings to pro gamers and streamers."
            }
        },
        wizard: {
            intro: {
                headline: "Let's get you set up.",
                subheader: "Head Click helps you find a mouse sensitivity that works for you, and then helps you keep it consistent between games.",
                questionOpening: "In order to use this site effectively, you'll need to know two things:",
                question1: "What your ideal monitor resolution is for normal desktop usage.",
                question2: "How to configure your mouse's DPI setting (or if that's not possible, what the stock DPI is.)",
                questionLink: <span>If you're not certain about either of these things, please refer to <a href="https://blog.head.click/configuration" target="_blank">this post<Icon style={{fontSize:"1em"}}>open_in_new</Icon></a> for assistance.</span>
            },
            assignment: {
                dpi: {
                    headline: "We've assigned you a DPI of ",
                    points: [
                        {
                            primary: "We recommend DPI based on desktop resolution.",
                            secondary: "Contrary to popular belief, modern games and mice don't perform better with a lower DPI. And given the growing adoption of extremely high-resolution monitors, along with shooters that require complex menu interaction, your best bet is to stick with whatever is comfortable for everyday desktop usage."
                        }
                    ]
                },
                sensitivity: {
                    headline: "We've assigned you a sensitivity of ",
                    points: [
                        {
                            primary: "This is roughly how many centimeters you'll move your mouse to rotate 360 degrees in a game.",
                            secondary: 'Also known as ' + cm360 + '. When zoomed in, or playing a game with a more narrow field of view, your actual ' + cm360 + ' should adjust correspondingly.'
                        },
                    ]
                }
            },
        },
        misc: {
            versionWarning: <span>Welcome to the Head Click alpha! This site is currently in its earliest stages of development, so there are still bugs and missing features. Read more about ongoing development <a href="https://blog.head.click/alpha" target="_blank">here</a>.</span>
        }
    }
}

export default copy