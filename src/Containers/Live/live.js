import React, {Component} from 'react';
import axios from 'axios';

import {server} from '../../config';
import AuthContext from '../../authContext';
import {withAppContext} from '../../HOC/withAppContext';
import {getAuthConfig} from '../../Utils/getAuthConfig';

import socket from '../../ExchangeSockets/socket';

class Live extends Component{
    static contextType = AuthContext;
    state = {
        exchanges : [],
        exchangeCurrencyMarketData : new Map()
    }

    sockets = [];
    setupSockets = () => {
        this.sockets = this.state.exchanges.map((exchange) => {
            return socket[exchange.exchangeKey].create(this.socketOpenHandler, this.socketMessageHandler, exchange.currencyMarketPairs);
        })
    }
    socketOpenHandler = (event) => {
        console.log(event);
    }
    socketMessageHandler = (message, err) => {
        if(err){
            console.error(err);
            return;
        }
        let ecmData = new Map(this.state.exchangeCurrencyMarketData);
        ecmData.set(message.key, message);
        this.setState((state) => { return { exchangeCurrencyMarketData : ecmData}});
        console.log(this.state.exchangeCurrencyMarketData);
        
    }
    
    componentDidMount(){
        let config = getAuthConfig(this.context); 
        axios.get(`${server}/user/trackedexchanges`, config).then((res) => {
            if(res.data){
                this.setState({
                    exchanges : res.data
                })
                this.setupSockets();
            }
        }).catch((err) => {
            console.error(err);
        })
    }

    disconnectSockets = () => {
        this.sockets.forEach((socket) => socket.destroy());
    }
    componentWillUnmount(){
        this.disconnectSockets();
    }

    getECMCards = () => {
        let ecmArray = Array.from(this.state.exchangeCurrencyMarketData.values());
        return ecmArray.map((ecm) => {
            return (
                <React.Fragment key={ecm.key}>
                    <div className="col-sm-3 mt-5">
                        <div className="card">
                            <div className="card-header">
                            <div class="card-title h4">{ecm.exchange}</div>
                            <h6 class="card-subtitle mb-2">{ecm.currency}/{ecm.market}</h6>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item ">Last Price : {ecm.lastPrice}</li>
                                <li className="list-group-item ">Buy : {ecm.buy}</li>
                                <li className="list-group-item ">Sell : {ecm.sell}</li>
                            </ul>
                            <div className="card-footer text-muted">
                                {ecm.timeStamp}
                            </div>                    
                        </div>
                    </div>
                </React.Fragment>
            )
        }
        )
    }

    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                    {this.getECMCards()}
                </div>
            </div>)
    }
}

export default withAppContext(Live);

