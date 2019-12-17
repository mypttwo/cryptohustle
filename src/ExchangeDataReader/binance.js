
const getDataBySymbolFromBinance = (data, symbol) => {
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

const readBinanceCurrencyData = (currencydata, key) =>{
    if(currencydata){
        return currencydata[key];
    }
    return null;
}

const getBinanceSymbolText = (currency, market) => {
    if(currency && market){
        return currency.toUpperCase() + market.toUpperCase();
    }
    return null;
}


export {getBinanceSymbolText,
    getDataBySymbolFromBinance,
    readBinanceCurrencyData}