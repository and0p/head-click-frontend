import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse'
import InfoOutline from '@material-ui/icons/InfoOutline';


// function for replacing tilde with unicode arrows
const replaceSettingArrows = text => {
    return text.replace(/~/g, "→")
}

const styles = theme => ({
    infoIcon: {
        color: '#555555'
    },
    infoListItem: {
        padding: '0px 16px',
        marginBottom: theme.spacing.unit
    }
  });

class SettingListItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    toggleOpen = () => {
        this.setState({ open: !this.state.open})
    }

    render() {
        const { classes, theme } = this.props;
        // Make sure we have a setting JSON passed in
        if("setting" in this.props)
        {
            // See if we have info
            const infoHtml = <ListItemIcon className={classes.infoIcon} onClick={this.toggleOpen}><InfoOutline /></ListItemIcon>
            const infoIcon = this.props.setting.hasOwnProperty("info") ? infoHtml : null
            return (
                <div>
                    <ListItem>
                        <ListItemText 
                            primary={this.props.setting.text}
                            secondary={replaceSettingArrows(this.props.setting.subtext)}
                        />
                        {infoIcon}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <ListItem className={classes.infoListItem}>
                            <Typography variant="caption">
                                {this.props.setting.info}
                            </Typography>
                        </ListItem>
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

SettingListItem.propTypes = {
    setting: PropTypes.object.isRequired
};

export default withStyles(styles)(SettingListItem)