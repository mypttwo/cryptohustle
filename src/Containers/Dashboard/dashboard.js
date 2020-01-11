import React, {Component} from 'react';
import axios from 'axios';

import {server} from '../../config';
import AuthContext from '../../authContext';
import {withAppContext} from '../../HOC/withAppContext';
import {getAuthConfig} from '../../Utils/getAuthConfig';
import ControlBar from '../../Components/controlBar';
import currencyList from '../../Utils/currencyList';
import marketList from '../../Utils/marketList';
import ExchangeCard from '../../Components/exchangeCard';
import exchange from '../../ExchangeDataReader/exchange';

class Dashboard extends Component{
    static contextType = AuthContext;
    state = {
        exchanges : [],
        currency : currencyList.eth,
        market : marketList.usdt,
        exchangeData : []
    }

    getExchangeNameFromKey = (key) => {
        let exchange = this.props.appContext.getExchangeByKey(key);
        return exchange? exchange.key : '';
    }

    getExchangeData =  (exchanges, currency, market) => {
        let requestedCurrency = currency ? currency:this.state.currency;
        let requestedMarket = market ? market : this.state.market;
        let exchangeList =  exchanges.map(async ex => {
            let exchangeName = this.getExchangeNameFromKey(ex.exchangeKey);
            let data = await exchange[ex.exchangeKey].read(requestedCurrency, requestedMarket);
            return {
                exchangeKey : ex.exchangeKey,
                exchangeName,
                data
            }
        })

        Promise.all(exchangeList).then((resArray) => {
            this.setState({
                exchangeData : resArray
            })
        })
    }

    getTrackedExchanges = () => {
        let config = getAuthConfig(this.context); 
        axios.get(`${server}/user/trackedexchanges`, config).then((res) => {
            if(res.data){
                this.setState({
                    exchanges : res.data
                })
                this.getExchangeData(res.data)
            }
        }).catch((err) => {
            console.error(err);
        })
    }

    timer = null;

    componentDidMount = () => {
        this.getTrackedExchanges();        
        this.timer = setInterval(() => this.getExchangeData(this.state.exchanges), 10 *1000);
    }

    componentWillUnmount(){
        clearTimeout(this.timer);
    }

    getExchangeCardsJSX = () => {
        return this.state.exchangeData.map(exchange => {
            if(exchange.data){
            return <ExchangeCard 
            key={exchange.exchangeKey} 
            exchangeKey={exchange.exchangeKey} 
            currency={this.state.currency}
            market={this.state.market}
            exchangeData={exchange}/>
            } else {
                return (
                    <div className="col-sm-3 mb-2">
                        <div>Login once again....</div>
                    </div>
                    )
            }
        })
    }

    selectCurrency = (currency) => {
        this.setState({
            currency : currency
        })
        this.getExchangeData(this.state.exchanges, currency);
    }

    selectMarket = (market) => {
        this.setState({
            market : market
        })
        this.getExchangeData(this.state.exchanges, null, market);
    }

    render(){                
        return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 mb-2">
                        <ControlBar selectCurrency={this.selectCurrency} selectMarket={this.selectMarket}  />
                    </div>
                </div>       
                <div className="row">
                    <div className="col-sm-12 mb-2">
                        <h4>{this.state.currency.symbol} / {this.state.market.symbol}</h4>
                    </div>
                </div>       
                <div className="row">
                    {this.getExchangeCardsJSX()}
                </div>
            </div>
        </React.Fragment>
        )
    }
}

export default withAppContext(Dashboard);