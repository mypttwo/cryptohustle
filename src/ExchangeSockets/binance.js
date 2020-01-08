import marketList from '../Utils/marketList';

const getCurrencyMarketPairValues = (currencyMarketPairs) => {
    return currencyMarketPairs.map((cmp) => {
        return `${cmp.currency.toLowerCase()}${cmp.market.toLowerCase()}@ticker`;
    })
}

const getCurrencyMarketPairFromSymbol = (symbol) => {
    let cmp = {};
    let markets = Object.values(marketList).filter(entry => {
        return symbol.endsWith(entry.symbol);
    });
    if(markets.length){
        cmp.market = markets[0].symbol;
        cmp.currency = symbol.replace(cmp.market,'');
        console.log(cmp);
        return cmp;
    }
}

// getCurrencyMarketPairValues('BTCUSDT');


const exchange = 'binance';

//https://binance-docs.github.io/apidocs/spot/en/#all-market-mini-tickers-stream
const create = (openHandler, messageHandler, currencyMarketPairs) => {
    try {
        let cmpArray = getCurrencyMarketPairValues(currencyMarketPairs);
        let socket = new WebSocket('wss://stream.binance.com:9443/ws');
        socket.addEventListener('open', event => {
            socket.send(JSON.stringify({
                "method": "SUBSCRIBE",
                "params":cmpArray,
                "id": 1
                }));
            openHandler(event);
        });
    
        socket.addEventListener('message', event =>  {
            //{"e":"24hrTicker","E":1578412151359,"s":"BTCUSDT","p":"259.58000000","P":"3.447","w":"7814.71958694","x":"7530.65000000","c":"7790.20000000","Q":"0.04008200","b":"7789.16000000","B":"0.01820400","a":"7790.20000000","A":"0.28085500","o":"7530.62000000","h":"8000.00000000","l":"7509.43000000","v":"69272.80998500","q":"541347585.03182238","O":1578325751333,"C":1578412151333,"F":224376112,"L":224922189,"n":546078}
            let data = JSON.parse(event.data);
            if(data['s']){
                let cmpVal = getCurrencyMarketPairFromSymbol(data['s']);

                let response = {
                    exchange : exchange,
                    currency : cmpVal.currency,
                    market : cmpVal.market,
                    key : `${exchange}_${cmpVal.currency}_${cmpVal.market}`,
                    lastPrice : data['c'],
                    buy : data['b'],
                    sell : data['a'],
                    timeStamp : '' + new Date()
                }
                messageHandler(response, null);
            }
            console.log(event.data);
        });   
        
        return {
            destroy : () => {
                try{
                    socket.send(JSON.stringify({
                        "method": "UNSUBSCRIBE",
                        "params": cmpArray,
                        "id": 1
                        }));
                } catch (err){
                    console.error(err);
                }

                socket.close();
            }
        }
        
    } catch (error) {
        messageHandler(null, error);
    }
    
}

export {create};

/*
{
  "e": "24hrTicker",  // Event type
  "E": 123456789,     // Event time
  "s": "BNBBTC",      // Symbol
  "p": "0.0015",      // Price change
  "P": "250.00",      // Price change percent
  "w": "0.0018",      // Weighted average price
  "x": "0.0009",      // First trade(F)-1 price (first trade before the 24hr rolling window)
  "c": "0.0025",      // Last price
  "Q": "10",          // Last quantity
  "b": "0.0024",      // Best bid price
  "B": "10",          // Best bid quantity
  "a": "0.0026",      // Best ask price
  "A": "100",         // Best ask quantity
  "o": "0.0010",      // Open price
  "h": "0.0025",      // High price
  "l": "0.0010",      // Low price
  "v": "10000",       // Total traded base asset volume
  "q": "18",          // Total traded quote asset volume
  "O": 0,             // Statistics open time
  "C": 86400000,      // Statistics close time
  "F": 0,             // First trade ID
  "L": 18150,         // Last trade Id
  "n": 18151          // Total number of trades
}
*/