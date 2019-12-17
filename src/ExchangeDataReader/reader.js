import {getBinanceSymbolText, getDataBySymbolFromBinance, readBinanceCurrencyData} from './binance';
import {getPoloniexSymbolText, getDataBySymbolFromPoloniex, readPoloniexCurrencyData} from './poloniex';
import {getCointigerSymbolText, getDataBySymbolFromCointiger, readCointigerCurrencyData} from './cointiger';
import {getP2pB2bSymbolText, getDataBySymbolFromP2pB2b, readP2pB2bCurrencyData} from './p2pb2b';
import copy from '../Utils/copy';

const get_currency_market_data = (state, currency, market) => {

    let exchangeDataList = [];
    exchangeDataList.market = market;

    let binanceSymbol = getBinanceSymbolText(currency, market);
    const binance_currency_market_data = getDataBySymbolFromBinance(state.binance, binanceSymbol);
    let binanceData = {
        exchangeName : 'Binance',
        exchangeCurrencyMarket : binance_currency_market_data,
        exchangeCurrencyDataReader : readBinanceCurrencyData,
        lastPriceKey : "lastPrice",
        buyKey : "bidPrice",
        sellKey : "askPrice",
        timestamp : '' + new Date()
    }
    exchangeDataList.push(binanceData);

    let poloniexSymbol = getPoloniexSymbolText(currency, market);
    const poloniex_currency_market_data = getDataBySymbolFromPoloniex(state.poloniex, poloniexSymbol);
    let poloniexData = {
        exchangeName : 'Poloniex',
        exchangeCurrencyMarket : poloniex_currency_market_data,
        exchangeCurrencyDataReader : readPoloniexCurrencyData,
        lastPriceKey : "last",
        buyKey : "highestBid",
        sellKey : "lowestAsk",
        timestamp : '' + new Date()

    }
    exchangeDataList.push(poloniexData);

    let cointigerSymbol = getCointigerSymbolText(currency, market);
    const cointiger_currency_market_data = getDataBySymbolFromCointiger(state.cointiger, cointigerSymbol);
    let cointigerData = {
        exchangeName : 'Cointiger',
        exchangeCurrencyMarket : cointiger_currency_market_data,
        exchangeCurrencyDataReader : readCointigerCurrencyData,
        lastPriceKey : "last",
        buyKey : "highestBid",
        sellKey : "lowestAsk",
        timestamp : '' + new Date()

    }
    exchangeDataList.push(cointigerData);

    let p2pB2bSymbol = getP2pB2bSymbolText(currency, market);
    const p2pB2b_currency_market_data = getDataBySymbolFromP2pB2b(state.p2pB2b, p2pB2bSymbol);
    let p2pB2bData = {
        exchangeName : 'P2pB2b',
        exchangeCurrencyMarket : p2pB2b_currency_market_data,
        exchangeCurrencyDataReader : readP2pB2bCurrencyData,
        lastPriceKey : "last",
        buyKey : "bid",
        sellKey : "ask",
        timestamp : '' + new Date()

    }
    exchangeDataList.push(p2pB2bData);    

    return exchangeDataList;
}

const getCalculatedData = (exchangeDataList) => {
    let lowestBuy, highestSell, profit, profit_percent;
    if(exchangeDataList.length > 0){
        let clone = copy(exchangeDataList);
        clone.sort((a, b) =>{
            
            let abuy = a.exchangeCurrencyDataReader(a.exchangeCurrencyMarket,a.buyKey);
            let bbuy = b.exchangeCurrencyDataReader(b.exchangeCurrencyMarket,b.buyKey);
            return abuy - bbuy;
        });
        lowestBuy = { exchangeName : clone[0].exchangeName, value : clone[0].exchangeCurrencyDataReader(clone[0].exchangeCurrencyMarket,clone[0].buyKey)};
        clone.sort((a, b) =>{
            
            let asell = a.exchangeCurrencyDataReader(a.exchangeCurrencyMarket,a.sellKey);
            let bsell = b.exchangeCurrencyDataReader(b.exchangeCurrencyMarket,b.sellKey);
            return bsell - asell;
        });
        let lastExchange = clone[0];
        highestSell = { exchangeName : lastExchange.exchangeName, value : lastExchange.exchangeCurrencyDataReader(lastExchange.exchangeCurrencyMarket,lastExchange.sellKey)};
        profit = highestSell.value - lowestBuy.value;
        profit_percent = 100 * (profit/lowestBuy.value);
    }

    return {lowestBuy, highestSell, profit, profit_percent}

}

export {get_currency_market_data, getCalculatedData};