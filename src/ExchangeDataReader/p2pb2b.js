
const getDataBySymbolFromP2pB2b = (data, symbol) => {
    if(data){
        return data[symbol].ticker;
    }
    return null;
}

const readP2pB2bCurrencyData = (currencydata, key) =>{
    if(currencydata){
        return currencydata[key];
    }
    return null;
}

const getP2pB2bSymbolText = (currency, market) => {
    if(currency && market){
        return currency.toUpperCase() +  '_' + market.toUpperCase();
    }
    return null;
}


export {getP2pB2bSymbolText,
    getDataBySymbolFromP2pB2b,
    readP2pB2bCurrencyData}