import PropTypes from "prop-types";
import React from "react";
import {createApiClient, Ticket} from './api';
import App from './App.tsx';


export default class HideText extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            display: true
        }
    }

    ToggleButton(){
        this.setState({display: !this.state.display})
    }


    render(){
        return(
            <div>
                {this.state.display && <button onClick={() => this.ToggleButton()}> 
                  Hide
                </button>}
                {this.state.display && this.props.object}
            </div>
            
        )
    }
}