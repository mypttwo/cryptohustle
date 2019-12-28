import axios from 'axios';

import {server} from '../config';

const getDataBySymbol = (data, symbol) => {
    if(data){
        return data[symbol];
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
        return  market.toUpperCase() + "_" + currency.toUpperCase();
    }
    return null;
}

const getData = () => {
    return axios.get(`${server}/proxypoloniex?command=returnTicker`);
}

const read = (currency, market) => {
    
    return getData().then((res) => {
        let symbol = getSymbolText(currency.symbol, market.symbol);
        let currencyData = getDataBySymbol(res.data,symbol);
        return{
            lastPrice : readCurrencyData(currencyData, "last"),
            buy : readCurrencyData(currencyData, "highestBid"),
            sell : readCurrencyData(currencyData, "lowestAsk"),
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