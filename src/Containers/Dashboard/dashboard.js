import React, {Component} from 'react';
const axios = require('axios');

import {server} from '../../config';

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

import React, {Component} from 'react';
const axios = require('axios');


const server = require('../config').server;
import {get_currency_market_data, getCalculatedData} from '../Utils/helper';

import CurrencyCard from './currencyCard';
import ControlBar from '../Components/controlBar';

class Dashboard extends Component{
    state = {
        binance : null,
        poloniex : null,
        cointiger : null,
        p2pB2b : null,
        authCode : null,
        selectedCurrency : {name : 'Ethereum', symbol : 'ETH'}
    }



    getDataFromBinance = () => {
        return axios.get(`${server}/proxybinance/api/v3/ticker/24hr`);
    }
    getDataFromPoloniex = () => {
        return axios.get(`${server}/proxypoloniex?command=returnTicker`);
    }
    getDataFromCointiger = () => {
        return axios.get(`${server}/proxycointiger/exchange/api/public/market/detail`);
    }
    getDataFromP2pb2b = () => {
        return axios.get(`${server}/proxyp2pb2b/api/v1/public/tickers`);
    }

    componentDidMount(){
        this.loadData();
    }

    loadData = () => {
        this.getDataFromBinance().then(result => {
            this.setState({
                binance : result.data
            })
        }).catch(error => {
            alert(error);
        })
        this.getDataFromPoloniex().then(result => {
            this.setState({
                poloniex : result.data
            })
        }).catch(error => {
            alert(error);
        })
        this.getDataFromCointiger().then(result => {
            this.setState({
                cointiger : result.data
            })
        }).catch(error => {
            alert(error);
        })
                this.getDataFromP2pb2b().then(result => {
            this.setState({
                p2pB2b : result.data.result
            })
        }).catch(error => {
            alert('pp2b ' + error);
        })
    }

    selectCurrency = (currency) => {
        this.setState({
            selectedCurrency : currency
        })
    }

    render(){
        let currency_btc_exchangeDataList = get_currency_market_data(this.state, this.state.selectedCurrency.symbol, 'BTC');
        let currency_usdt_exchangeDataList = get_currency_market_data(this.state, this.state.selectedCurrency.symbol, 'USDT');

        return(
            <React.Fragment>
                <div className="container-fluid">
                <ControlBar selectCurrency={this.selectCurrency} loadData={this.loadData} />
                    <div className="row">
                        <div className="col-sm-4">
                            <CurrencyCard currency={this.state.selectedCurrency.symbol} 
                            market={currency_btc_exchangeDataList.market} 
                            exchangeDataList={currency_btc_exchangeDataList}/>                          
                        </div>
                        <div className="col-sm-4">
                            <CurrencyCard currency={this.state.selectedCurrency.symbol} 
                            market={currency_usdt_exchangeDataList.market} 
                            exchangeDataList={currency_usdt_exchangeDataList}/>                          
                        </div>                     
                    </div>
                </div>
            </React.Fragment>
        )
    }
    
}

export default Dashboard;