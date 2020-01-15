import axios from 'axios';

import {server} from '../config';

const getDataBySymbol = (data, symbol) => {
    if(data && data.ticker && data.ticker.length){
        return data.ticker[0];
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
        return currency.toLowerCase()+ '_' + market.toLowerCase();
    }
    return null;
}

const getData = (currency, market) => {
    let currencySymbol = currency.symbol? currency.symbol : currency;
    let marketSymbol = market.symbol ? market.symbol : market;
    let symbol = getSymbolText(currencySymbol, marketSymbol);
    return axios.get(`${server}/proxydigifinex?symbol=${symbol}`);
}

const exchange = 'digifinex';

const read = (currency, market) => {

    return getData(currency, market).then((res) => {
        let symbol = getSymbolText(currency.symbol, market.symbol);
        let currencyData = getDataBySymbol(res.data,symbol);
        return{
            lastPrice : currencyData ? readCurrencyData(currencyData, "last") : null,
            buy : currencyData ? readCurrencyData(currencyData, "buy") : null,
            sell : currencyData ? readCurrencyData(currencyData, "sell") : null,
            allData : currencyData,
            cache : res.data,
            key : `${exchange}_${currency.symbol}_${market.symbol}`,
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