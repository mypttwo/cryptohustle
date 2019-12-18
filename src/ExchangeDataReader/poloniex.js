
const getDataBySymbolFromPoloniex = (data, symbol) => {
    if(data){
        return data[symbol];
    }
    return null;
}

const readPoloniexCurrencyData = (currencydata, key) =>{
    if(currencydata){
        return currencydata[key];
    }
    return null;
}


const getPoloniexSymbolText = (currency, market) => {
    if(currency && market){
        return  market.toUpperCase() + "_" + currency.toUpperCase();
    }
    return null;
}

export {getPoloniexSymbolText,
    getDataBySymbolFromPoloniex,
    readPoloniexCurrencyData}