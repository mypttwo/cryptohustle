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
        exchanges : []
    }

    sockets = [];
    setupSockets = () => {
        this.sockets = this.state.exchanges.map((exchange) => {
            return socket[exchange.exchangeKey].create(this.socketOpenHandler, this.socketMessageHandler);
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
        console.log(message);
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
    render(){
        return <div>
            Live
        </div>
    }
}

export default withAppContext(Live);

