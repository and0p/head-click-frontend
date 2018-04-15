import React from 'react';

const img = {
    "logo": {
        "1x": 'https://i.imgur.com/VLw8FjW.png',
        "1.5x": 'https://i.imgur.com/zcMfEva.png',
        "2x": 'https://i.imgur.com/I0cjcUQ.png'
    }
}

class ResponsiveAsset extends React.Component {
    render() {
        if(img.hasOwnProperty(this.props.asset))
        {
            let srcset = img[this.props.asset]["1x"] + ", " + img[this.props.asset]["1.5x"] + " 1.5x," + img[this.props.asset]["2x"] + " 2x"
            return <img srcset={srcset} src={img[this.props.asset].normal} className={this.props.className} />
        }
        else
        {
            return null
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