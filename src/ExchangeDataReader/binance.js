import axios from 'axios';

import {server} from '../config';

const getDataBySymbol = (data, symbol) => {
    if(Array.isArray(data)){
        let filtered = data.filter((item) => {
            return item.symbol === symbol;
        })
        if(filtered.length){
            return filtered[0];
        }
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
        return currency.toUpperCase() + market.toUpperCase();
    }
    return null;
}

const getData = () => {
    return axios.get(`${server}/proxybinance/api/v3/ticker/24hr`);
}

const read = (currency, market) => {

    return getData().then((res) => {
        let symbol = getSymbolText(currency.symbol, market.symbol);
        let currencyData = getDataBySymbol(res.data,symbol);
        return{
            lastPrice : currencyData ? readCurrencyData(currencyData, "lastPrice") : null,
            buy : currencyData ? readCurrencyData(currencyData, "bidPrice") : null,
            sell : currencyData ? readCurrencyData(currencyData, "askPrice") : null,
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