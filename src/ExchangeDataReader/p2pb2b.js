import axios from 'axios';

import {server} from '../config';

const getDataBySymbol = (data, symbol) => {
    
    if(data){
        return data.result[symbol].ticker;
    }
    return null;
}

const readCurrencyData = (currencydata, key) =>{
    if(currencydata){
        return currencydata[key];
    }
    return null;
}

const getSymbolText = (currency, market) => {
    if(currency && market){
        return currency.toUpperCase() +  '_' + market.toUpperCase();
    }
    return null;
}

const getData = () => {
    return axios.get(`${server}/proxyp2pb2b/api/v1/public/tickers`);
}

const read = (currency, market) => {
   
    return getData().then((res) => {
        let symbol = getSymbolText(currency.symbol, market.symbol);
        let currencyData = getDataBySymbol(res.data,symbol);
        return{
            lastPrice : readCurrencyData(currencyData, "last"),
            buy : readCurrencyData(currencyData, "bid"),
            sell : readCurrencyData(currencyData, "ask"),
            allData : currencyData,
            cache : res.data
        }
        
    }).catch((err) => {
        console.error(err);
    })
}


export {
    getSymbolText,
    getDataBySymbol,
    readCurrencyData,
    read
}