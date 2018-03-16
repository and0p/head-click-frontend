import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

class SettingListItem extends React.Component {

    render() {
        if("setting" in this.props)
        {
            return (
                <ListItem>
                    <ListItemText primary={setting.test} secondary={setting.subtext} />
                </ListItem>
            )
        }
        else
        {
            return null
        }
    }

}

SettingListItem.propTypes = {
    setting: PropTypes.object.isRequired
  };