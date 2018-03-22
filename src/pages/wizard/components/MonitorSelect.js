import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import * as Symbols from '../../../redux/HcSymbols'

const styles = theme => ({

});

const MonitorButton = () => {
    return <div />
}

class MonitorSelect extends React.Component {

    render() {
        return(
            <div>
                <Typography variant="headline" gutterBottom>Monitor select!</Typography>
                <Typography variant="body1">Test</Typography>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    
}
  
const mapDispatchToProps = dispatch => {
    return {
        selectMonitor: monitor => dispatch({
            type: Symbols.SELECT_MONITOR,
            value: monitor
        }),
        setReady: () => dispatch({
            type: Symbols.SET_WIZARD_READY,
            value: 1
        }),
        setNotReady: () => dispatch({
            type: Symbols.SET_WIZARD_NOT_READY,
            value: 1
        }),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MonitorSelect))