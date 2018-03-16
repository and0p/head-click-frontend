import React from 'react';
import PropTypes from 'prop-types'
import { List, ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse'
import InfoOutline from 'material-ui-icons/InfoOutline';

const replaceSettingArrows = text => {
    return text.replace(/~/g, "→")
}

class SettingListItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    toggleOpen = () => {
        this.setState({ open: !this.state.open})
        console.log(this.state.open)
    }

    render() {
        // Make sure we have a setting JSON passed in
        if("setting" in this.props)
        {
            // See if we have info
            const infoHtml = <ListItemIcon><InfoOutline /></ListItemIcon>
            const infoIcon = this.props.setting.hasOwnProperty("info") ? infoHtml : null
            return (
                <div>
                    <ListItem onClick={this.toggleOpen}>
                        <ListItemText 
                            primary={this.props.setting.text}
                            secondary={replaceSettingArrows(this.props.setting.subtext)}
                        />
                        {infoIcon}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <ListItem>text</ListItem>
                    </Collapse>
                </div>
            )
        }
        else
        {
            return null
        }
    }
}

{/* <ListItemIcon>
<Warning />
</ListItemIcon> */}

SettingListItem.propTypes = {
    setting: PropTypes.object.isRequired
};

export default SettingListItem