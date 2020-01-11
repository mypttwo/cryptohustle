import marketList from '../Utils/marketList';

const getCurrencyMarketPairValues = (currencyMarketPairs) => {
    return currencyMarketPairs.map((cmp) => {
        return `${cmp.currency.toUpperCase()}_${cmp.market.toUpperCase()}`;
    })
}

const getCurrencyMarketPairFromSymbol = (symbol) => {
    let cmp = {};
    let markets = Object.values(marketList).filter(entry => {
        return symbol.endsWith(entry.symbol);
    });
    if(markets.length){
        cmp.market = markets[0].symbol;
        cmp.currency = symbol.replace('_', '').replace(cmp.market,'');
        console.log(cmp);
        return cmp;
    }
}


const exchange = 'digifinex';

//https://github.com/DigiFinex/api/blob/master/Websocket_API_en.md
const create = (openHandler, messageHandler, currencyMarketPairs) => {
    try {
        let cmpArray = getCurrencyMarketPairValues(currencyMarketPairs);
        let socket = new WebSocket('wss://openapi.digifinex.com/ws/v1/');
        socket.addEventListener('open', event => {
            debugger;
            socket.send(JSON.stringify({
                "id":12312, 
                "method":"ticker.subscribe", 
                "params":["ETH_USDT", "BTC_USDT"]
            }));
            openHandler(event);
        });
    
        socket.addEventListener('message', event =>  {
            debugger;
            // let data = JSON.parse(event.data);
            // if(data['s']){
            //     let cmpVal = getCurrencyMarketPairFromSymbol(data['s']);

            //     let response = {
            //         exchange : exchange,
            //         currency : cmpVal.currency,
            //         market : cmpVal.market,
            //         key : `${exchange}_${cmpVal.currency}_${cmpVal.market}`,
            //         lastPrice : data['c'],
            //         buy : data['b'],
            //         sell : data['a'],
            //         timeStamp : '' + new Date()
            //     }
            //     messageHandler(response, null);
            // }
            console.log(event.data);
        });   
        
        return {
            destroy : () => {
                try{
                    socket.send(JSON.stringify({
                        "id":12312, 
                        "method":"ticker.unsubscribe", 
                        "params":[]
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