import React, {Component} from 'react';
import axios from 'axios';

import {server} from '../../config';
import AuthContext from '../../authContext';
import {withAppContext} from '../../HOC/withAppContext';
import {getAuthConfig} from '../../Utils/getAuthConfig';

import currencyList from '../../Utils/currencyList';
import marketList from '../../Utils/marketList';

import socket from '../../ExchangeSockets/socket';
import apiDataReader from '../../ExchangeDataReader/exchange';

class Live extends Component{
    static contextType = AuthContext;
    state = {
        trackedExchanges : [],
        wsExchangeCurrencyMarketData : new Map(),
        apiExchangeCurrencyMarketData : new Map(),
        apiExchanges: []
    }

    sockets = [];
    setupSockets = () => {
        let apiExchanges = [];
        this.sockets = this.state.trackedExchanges.filter(trackedExchange => {
            let exchange = this.props.appContext.getExchangeByKey(trackedExchange.exchangeKey);
            if(exchange && !exchange.websocketEnabled){
                apiExchanges.push(trackedExchange);
            }
            return exchange? exchange.websocketEnabled : false;
        }).map((trackedExchange) => {
            return socket[trackedExchange.exchangeKey].create(this.socketOpenHandler, this.socketMessageHandler, trackedExchange.currencyMarketPairs);
        });
        console.log(this.sockets.length);
        console.log(apiExchanges);
        this.setState({
            apiExchanges : [...apiExchanges]
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
        let ecmData = new Map(this.state.wsExchangeCurrencyMarketData);
        ecmData.set(message.key, message);
        this.setState((state) => { return { wsExchangeCurrencyMarketData : ecmData}});
        console.log(this.state.wsExchangeCurrencyMarketData);
        
    }

    getExchangeNameFromKey = (key) => {
        let exchange = this.props.appContext.getExchangeByKey(key);
        return exchange? exchange.key : '';
    }

    //https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays
    flatten = (arr) => {
        return arr.reduce((flat, toFlatten) => {
          return flat.concat(Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten);
        }, []);
      }

    getApiExchangeData =  () => {
        let apiExchangeCurrencyMarketUnflattenedArr = this.state.apiExchanges.map(apiExchange => {
            return apiExchange.currencyMarketPairs.map(cmp => {
                return {
                    exchangeKey : apiExchange.exchangeKey,
                    currency : currencyList[cmp.currency.toLowerCase()],
                    market : marketList[cmp.market.toLowerCase()]
                }
            })
        });

        let apiExchangeCurrencyMarketArr = this.flatten(apiExchangeCurrencyMarketUnflattenedArr);

        let apiExchangeCurrencyMarketPromiseList =  apiExchangeCurrencyMarketArr.map(async excm => {
            let exchangeName = this.getExchangeNameFromKey(excm.exchangeKey);
            let data = await apiDataReader[excm.exchangeKey].read(excm.currency, excm.market);
            return {
                exchange : exchangeName,
                currency : excm.currency.symbol,
                market : excm.market.symbol,
                ...data
            }
        })

        Promise.all(apiExchangeCurrencyMarketPromiseList).then((resArray) => {
            this.setState({
                apiExchangeCurrencyMarketData : resArray
            })
            console.log(resArray);
            
        })
    }
    
    apiDataReaderTimer = null;
    componentDidMount(){
        let config = getAuthConfig(this.context); 
        axios.get(`${server}/user/trackedexchanges`, config).then((res) => {
            if(res.data){
                this.setState({
                    trackedExchanges : res.data
                })
                this.setupSockets();
            }
        }).catch((err) => {
            console.error(err);
        })
        this.getApiExchangeData();
        this.apiDataReaderTimer = setInterval(() => this.getApiExchangeData(), 15 * 1000);
    }

    disconnectSockets = () => {
        this.sockets.forEach((socket) => socket.destroy());
    }
    componentWillUnmount(){
        this.disconnectSockets();
        clearInterval(this.apiDataReaderTimer);
    }

    getECMCardsWS = () => {
        let ecmArray = Array.from(this.state.wsExchangeCurrencyMarketData.values());
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
    getECMCardsAPI = () => {
        let ecmArray = Array.from(this.state.apiExchangeCurrencyMarketData.values());
        return ecmArray.map((ecm) => {
            ecm.timeStamp = '' + new Date();
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
                    {this.getECMCardsWS()}
                    {this.getECMCardsAPI()}
                </div>
            </div>)
    }
}

export default withAppContext(Live);

