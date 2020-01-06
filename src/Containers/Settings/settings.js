import React, {Component} from 'react';
import axios from 'axios';

import {server} from '../../config';
import AuthContext from '../../authContext';
import {withAppContext} from '../../HOC/withAppContext';
import {getAuthConfig} from '../../Utils/getAuthConfig';

import SettingsExchangeSetup from '../SettingsExchangeSetup/settingsExchangeSetup';


class Settings extends Component{

    static contextType = AuthContext;
    
    state = {
        exchanges : []
    }

    componentDidMount(){
        let config = getAuthConfig(this.context); 
        axios.get(`${server}/user/trackedexchanges`, config).then((res) => {
            if(res.data){
                let updatedExchanges =  this.props.exchanges.map((exchange) => {
                    let updatedExchange = {key : exchange.key, name : exchange.name, url : exchange.url};
                    updatedExchange.isSelected = false;
                    let filteredExchanges = res.data.filter((trackedExchange) => trackedExchange.exchangeKey === updatedExchange.key);
                    updatedExchange.isSelected = filteredExchanges.length?  true : false;
                    updatedExchange.currencyMarketPairs = [];
                    if(updatedExchange.isSelected){
                        Object.assign(updatedExchange.currencyMarketPairs, filteredExchanges[0].currencyMarketPairs);
                    }
                    return updatedExchange;
                });
                console.log(updatedExchanges);
                
                this.setState({
                    exchanges : updatedExchanges
                })
            }
        }).catch((err) => {
            console.error(err);
        })        
    }

    handleCheckboxChange = (exchangeKey) => {
        let exchanges = [...this.state.exchanges];
        let exchangesUpdated = exchanges.map((exchange) => {
            if(exchange.key == exchangeKey){
                exchange.isSelected = !exchange.isSelected
            }
            return exchange;
        })
        this.setState({
            exchanges : [...exchangesUpdated]
        })
    }

    addCurrencyMarketPair = (exchange, currency, market) => {
        let exchanges = [...this.state.exchanges];
        let exchangesUpdated = exchanges.map((ex) => {
            if(ex.key == exchange.key){
                ex.currencyMarketPairs.push({
                    currency : currency.symbol, 
                    market : market.symbol
                })
            }
            return ex;
        })
        this.setState({
            exchanges : [...exchangesUpdated]
        })
    }

    deleteCurrencyMarketPair = (exchange, index) => {
        let exchanges = [...this.state.exchanges];
        let exchangesUpdated = exchanges.map((ex) => {
            if(ex.key == exchange.key){
                ex.currencyMarketPairs.splice(index,1);
            }
            return ex;
        })
        this.setState({
            exchanges : [...exchangesUpdated]
        })
    }

    

    getExchangeJSX = () => {
        return this.state.exchanges.map((exchange) => {   
            return (
                <SettingsExchangeSetup exchange={exchange} key={exchange.key}
                deleteCurrencyMarketPair={this.deleteCurrencyMarketPair}
                addCurrencyMarketPair={this.addCurrencyMarketPair}
                handleCheckboxChange={this.handleCheckboxChange}
                />           
            )
        });        
    }

    handleSave = () => {
        let config = getAuthConfig(this.context); 
        let selectedExchangesKeys = this.state.exchanges.filter(exchange => exchange.isSelected)
        .map(exchange => {
                return {
                    exchangeKey : exchange.key, 
                    currencyMarketPairs : exchange.currencyMarketPairs
                }
            });

        axios.post(`${server}/user/trackedexchanges`,selectedExchangesKeys, config).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    render(){
        return(
            <div className="container pt-5">
                <h2>Settings</h2>
                <hr/>
                <h4>Select the Exchanges you wish to track.</h4>
                <div className="htmlForm">
                    {this.getExchangeJSX()}
                </div>
                <div className="pt-5 pb-5"><button onClick={this.handleSave} type="button" className="btn btn-primary">Save</button></div>
            </div> 
        )
    }
}

export default withAppContext(Settings);


