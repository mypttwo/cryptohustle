import axios from 'axios';

import {server} from '../config';

const getDataBySymbol = (data, symbol) => {
    if(data && data.result){
        return data.result
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
        return currency.toUpperCase()+ '_' + market.toUpperCase();
    }
    return null;
}

const getData = (currency, market) => {
    let symbol = getSymbolText(currency.symbol, market.symbol);
    return axios.get(`${server}/proxybibox?cmd=ticker&pair=${symbol}`);
}

const read = (currency, market) => {

    return getData(currency, market).then((res) => {
        let symbol = getSymbolText(currency.symbol, market.symbol);
        let currencyData = getDataBySymbol(res.data,symbol);
        return{
            lastPrice : currencyData ? readCurrencyData(currencyData, "last") : null,
            buy : currencyData ? readCurrencyData(currencyData, "buy") : null,
            sell : currencyData ? readCurrencyData(currencyData, "sell") : null,
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