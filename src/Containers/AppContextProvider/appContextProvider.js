import React, {Component} from 'react';
import axios from 'axios';

import {server} from '../../config';

export const AppContext = React.createContext('app');

class AppContextProvider extends Component{
    constructor(props){
        super(props);
        this.state = {
            exchanges : []
        }
    }

    componentDidMount(){
        axios.get(`${server}/exchange`).then((res) => {
            if(res.data){
                this.setState({
                    exchanges : res.data
                })
            }
        }).catch((err) => {
            console.error(err);
        })
    }

    getExchangeByKey = (key) => {
        let exchangeArr = this.state.exchanges.filter((exchange) => {
            return exchange.key == key
        })   
        if(exchangeArr.length > 1){
            const reducer = (accumulator, exchange) => accumulator + exchange.key + ' ';
            exchangeArr.reduce(reducer, `Exchange Key :  ${key} Exchanges : `);
            console.error(exchangeArr.reduce(reducer, `Exchange Key :  ${key} Exchanges : `));
        }     
        if(exchangeArr.length){
            return exchangeArr[0];
        }
    }

    render(){
        return (
            <AppContext.Provider
            value={{
                appContext : {
                    getExchangeByKey : this.getExchangeByKey,
                    ...this.state}
            }}>
                {this.props.children}
            </AppContext.Provider>
        )

    }
}

export default AppContextProvider;