import React from 'react';

const img = {
    "headclick": {
        "logo": {
            "1x": 'https://i.imgur.com/VLw8FjW.png',
            "1.5x": 'https://i.imgur.com/zcMfEva.png',
            "2x": 'https://i.imgur.com/I0cjcUQ.png'
        }
    },
    "overwatch": {
        "logo": {
            "1x": 'https://i.imgur.com/2wQejzS.png',
            "1.5x": 'https://i.imgur.com/ywEqHmF.png',
            "2x": 'https://i.imgur.com/QNsiNZE.png'
        },
        "logo_big": {
            "1x": 'https://i.imgur.com/dcdlVuD.png',
            "1.5x": 'https://i.imgur.com/prMLHaE.png',
            "2x": 'https://i.imgur.com/6EYXAhl.png'
        },
        "logo_mini": {
            "1x": 'https://i.imgur.com/lbMzkYM.png',
            "1.5x": 'https://i.imgur.com/wuztCN7.png',
            "2x": 'https://i.imgur.com/GJZhxbb.png'
        },
    },
    "pubg": {
        "logo": {
            "1x": 'https://i.imgur.com/1Fa3hFm.png',
            "1.5x": 'https://i.imgur.com/uGIjtz1.png',
            "2x": 'https://i.imgur.com/CsQwQFr.png'
        },
        "logo_big": {
            "1x": 'https://i.imgur.com/R38OS5M.png',
            "1.5x": 'https://i.imgur.com/wqO01rS.png',
            "2x": 'https://i.imgur.com/okBE8Dt.png'
        },
        "logo_mini": {
            "1x": 'https://i.imgur.com/eBL7lSh.png',
            "1.5x": 'https://i.imgur.com/UN08eUV.png',
            "2x": 'https://i.imgur.com/goWpbUX.png'
        },
    }
}

class ResponsiveAsset extends React.Component {
    render() {
        if(img.hasOwnProperty(this.props.category) && img[this.props.category].hasOwnProperty(this.props.asset))
        {
            let srcset = img[this.props.category][this.props.asset]["1x"] + ", " + img[this.props.category][this.props.asset]["1.5x"] + " 1.5x," + img[this.props.category][this.props.asset]["2x"] + " 2x"
            return <img srcset={srcset} src={img[this.props.category][this.props.asset].normal} className={this.props.className} />
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