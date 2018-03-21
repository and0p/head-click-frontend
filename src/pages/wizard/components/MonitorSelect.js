import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({

});

class MonitorSelect extends React.Component {

    render() {
        this.props.setReady(false)
        return(
            <div>
                <Typography variant="headline">Monitor select!</Typography>
            </div>
        )
    }
    
}

export default withStyles(styles)(MonitorSelect)