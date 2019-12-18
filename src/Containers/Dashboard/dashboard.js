import React, {Component} from 'react';
const axios = require('axios');

import {server} from '../../config';
import {get_currency_market_data} from '../../ExchangeDataReader/reader';

class Dashboard extends Component{
    state = {
        authToken : null,
        userDbId : null,
    }
    componentDidMount(){
        if(!this.props.authToken){
            this.props.handleLogout();// this will not work if props are not populated.
        }
        this.setState({
            authToken : this.props.authToken,
            userDbId : this.props.userDbId,            
        })
    }
    render(){
        return <div>
            Dashboard
        </div>
    }
}

export default Dashboard;

