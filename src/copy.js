import React from 'react'
import Icon from '@material-ui/core/Icon'

export const dots = ".................................................................................................................................................................."
export const cm360 = "cm/360°"

const linkIcon = <Icon style={{fontSize:"1em"}}>open_in_new</Icon>

const copy = {
    en: {
        technical: {
            cm360: "cm/360°",
            calculator: {
                description: "Select a game below and enter the DPI and sensitivity settings you play it with to find out what your hipfire cm/360° is."
            }
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
            tutorial: "Welcome to your dashboard!",
        },
        wizard: {
            intro: {
                headline: "Let's get started.",
                subheader: "Head Click helps you find a mouse sensitivity that works for you, and then helps you keep it consistent between games.",
                questionOpening: "In order to use this site effectively, you'll need to know a couple things:",
                question1: <span>What your ideal monitor resolution is for normal desktop usage. <a href="https://blog.head.click/monitor_resolution/" target="_blank">More info {linkIcon}</a></span>,
                question2: <span>How to configure your mouse's DPI setting, if possible. <a href="https://blog.head.click/dpi_for_gaming/" target="_blank">More info {linkIcon}</a></span>,
                questionLink: <span>Once you have that figured out, click "NEXT" below to continue.</span>
            },
            assignment: {
                dpi: {
                    headline: "We've assigned you a DPI of ",
                    points: [
                        {
                            primary: "We recommend DPI based on desktop resolution.",
                            secondary: <span>Contrary to popular belief, modern games and mice don't perform better with a lower DPI. And given the growing adoption of extremely high-resolution monitors, along with shooters that require complex menu interaction, your best bet is to stick with whatever is comfortable for everyday desktop usage. <a href="https://blog.head.click/dpi_for_gaming/" target="_blank">Read more {linkIcon}</a></span>
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
                headline: "Good to go.",
                subheader: <span>Your profile is all set up!<br/><br/>Here's a brief overview of how to use Head Click:</span>,
                tips: [
                    <span>Make sure your DPI and resolution match your profile. <ul><li>Edit your profile from the dashboard if needed with the <Icon style={{fontSize:"1em"}}>create</Icon> icon.</li><li>Your profile is how we generate your in-game settings, so it needs to be accurate.</li></ul></span>,
                    "Select a game from the sidebar.",
                    "If the game has any options, set them according to your needs.",
                    "Set the in-game settings to the ones we calculate for you.",
                    "See how it feels! Try to practice against bots if possible. If you think it's not the right sensitivity, change your sensitivity from the dashboard and try again."
                ]
            }
        },
        misc: {
            versionWarning: <span>Welcome to the Head Click beta! This site is a work-in-progress, so please excuse any bugs or missing features. You can read more about ongoing development <a href="https://blog.head.click/beta" target="_blank">here{linkIcon}</a>. Please consider taking a few moments to fill out our <a href="https://goo.gl/forms/3RLy7AaEZrsYAozz2" target="_blank">user experience survery{linkIcon}</a></span>
        }
    }
}

export default copy