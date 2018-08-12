import React from 'react'
import Icon from '@material-ui/core/Icon'

export const dots = ".................................................................................................................................................................."
export const cm360 = "cm/360°"

const linkIcon = <Icon style={{fontSize:"1em"}}>open_in_new</Icon>

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
                verbose:  "Find the mouse sensitivity that's right for you."
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
        dashboard: {
            tutorial: "Welcome to your dashboard! "
        },
        wizard: {
            intro: {
                headline: "Let's get you set up.",
                subheader: "Head Click helps you find a mouse sensitivity that works for you, and then helps you keep it consistent between games.",
                questionOpening: "In order to use this site effectively, you'll need to know two things:",
                question1: "What your ideal monitor resolution is for normal desktop usage.",
                question2: "How to configure your mouse's DPI setting (or if that's not possible, what the stock DPI is.)",
                questionLink: <span>If you're not certain about either of these things, please refer to <a href="https://blog.head.click/configuration" target="_blank">this post{linkIcon}</a> for assistance.</span>
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
            outro: {
                headline: "You're all set.",
                subheader: "Placeholder: brief site tutorial."
            }
        },
        misc: {
            versionWarning: <span>Welcome to the Head Click beta! This site is a work-in-progress, so please excuse any bugs or missing features. You can read more about ongoing development <a href="https://blog.head.click/beta" target="_blank">here{linkIcon}</a>. Please consider taking a few moments to fill out our <a href="https://goo.gl/forms/3RLy7AaEZrsYAozz2" target="_blank">user experience survery{linkIcon}</a></span>
        }
    }
}

export default copy