import React from 'react'

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
                headline: "Let's figure out your setup.",
                subheader: "This wizard will help you determine your ideal DPI and mouse sensitivity based on your monitor size, most-played games, and gaming style."
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