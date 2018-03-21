import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({

});

class WizardSplash extends React.Component {

    render() {
        this.props.setReady(true)
        return(
            <div>
                <Typography variant="headline">Welcome!</Typography>
            </div>
        )
    }
    
}

export default withStyles(styles)(WizardSplash)