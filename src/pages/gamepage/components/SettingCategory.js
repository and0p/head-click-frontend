import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse'
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import SettingListItem from './SettingListItem'

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    yellowCategory: {
        backgroundColor: theme.palette.custom.yellow
    },
    blueCategory: {
        backgroundColor: theme.palette.custom.blue
    },
    redCategory: {
        backgroundColor: theme.palette.custom.red
    },
    tealCategory: {
        backgroundColor: theme.palette.custom.teal
    },
    purpleCategory: {
        backgroundColor: theme.palette.custom.purple
    },
    defaultCategory: {
        backgroundColor: theme.palette.primary.main
    },
    category: {
        marginBottom: theme.spacing.unit * 1
    }
  });

class SettingCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: this.props.open
        }
    }

    toggleOpen = () => {
        this.setState({ open: !this.state.open})
    }

    render() {
        const { classes, theme } = this.props;
        // Select color
        let categoryClass = classes.defaultCategory
        switch(this.props.color) {
            case 'yellow':
                categoryClass = classes.yellowCategory
                break
            case 'red':
                categoryClass = classes.redCategory
                break
            case 'blue':
                categoryClass = classes.blueCategory
                break
            case 'teal':
                categoryClass = classes.tealCategory
                break
            case 'purple':
                categoryClass = classes.purpleCategory
                break
        }
        let upperName = this.props.name.toUpperCase()
        // See if this category has any settings at all, if not return nothing
        if(this.props.settings.length > 0) {
            return(
                <div className={classes.category}>
                    <ListItem className={categoryClass} onClick={this.toggleOpen}>
                        <ListItemText 
                            primary={upperName}
                        />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List subheader={<li />} className={classes.nested}>
                            {
                                this.props.settings.map((s) => 
                                    <SettingListItem setting={s} />
                                )
                            }
                        </List>
                    </Collapse>
                </div>
            )
        }
        else { return null }
    }
}

SettingCategory.propTypes = {
    name: PropTypes.string.isRequired,
    settings: PropTypes.array.isRequired,
    open: PropTypes.bool,
    color: PropTypes.string
};

export default withStyles(styles)(SettingCategory)