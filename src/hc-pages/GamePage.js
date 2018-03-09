import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import HcModel from '../hc-model/HcModel'

class GamePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let gameAlias = this.props.match.params.name
        // See if we have this game
        if(HcModel.games.hasOwnProperty(gameAlias)) {
            let game = HcModel.games[gameAlias]
            return (
                <div>
                    {game.name}
                </div>
            )
        }
        else
        {
            return (
                <div>
                    Game not found!
                </div>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
      
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GamePage)