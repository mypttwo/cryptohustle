
const getDataBySymbolFromCointiger = (data, symbol) => {
    if(data){
        return data[symbol];
    }
    return null;
}

const readCointigerCurrencyData = (currencydata, key) =>{
    if(currencydata){
        return currencydata[key];
    }
    return null;
}


const getCointigerSymbolText = (currency, market) => {
    if(currency && market){
        return  currency.toUpperCase()+market.toUpperCase();
    }
    return null;
}

export {getCointigerSymbolText,
    getDataBySymbolFromCointiger,
    readCointigerCurrencyData}