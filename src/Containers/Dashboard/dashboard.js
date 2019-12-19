import React, {Component} from 'react';

import AuthContext from "../../authContext";
// import {server} from '../../config';
// import {get_currency_market_data} from '../../ExchangeDataReader/reader';

class Dashboard extends Component{
    static contextType = AuthContext;

    componentDidMount = () => {
        console.log(this.context.userDbId);
    }

    render(){        
        return <div>
            Dashboard
        </div>
    }
}

export default Dashboard;