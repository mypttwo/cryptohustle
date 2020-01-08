const currencyMarketPairLookup = {
    BTC_ARDR:177,
    BTC_ATOM:253,
    BTC_BAT:210,
    BTC_BCH:189,
    BTC_BCHABC:236,
    BTC_BCHSV:238,
    BTC_BCN:7,
    BTC_BNT:232,
    BTC_BTS:14,
    BTC_BURST:15,
    BTC_CVC:194,
    BTC_DASH:24,
    BTC_DCR:162,
    BTC_DGB:25,
    BTC_DOGE:27,
    BTC_EOS:201,
    BTC_ETC:171,
    BTC_ETH:148,
    BTC_FCT:155,
    BTC_FOAM:246,
    BTC_GAS:198,
    BTC_GNT:185,
    BTC_GRIN:251,
    BTC_HUC:43,
    BTC_KNC:207,
    BTC_LOOM:213,
    BTC_LPT:250,
    BTC_LSK:163,
    BTC_LTC:50,
    BTC_MAID:51,
    BTC_MANA:229,
    BTC_NMC:64,
    BTC_NMR:248,
    BTC_NXT:69,
    BTC_OMG:196,
    BTC_OMNI:58,
    BTC_POLY:249,
    BTC_PPC:75,
    BTC_QTUM:221,
    BTC_REP:174,
    BTC_SBD:170,
    BTC_SC:150,
    BTC_SNT:204,
    BTC_STORJ:200,
    BTC_STR:89,
    BTC_STRAT:182,
    BTC_SYS:92,
    BTC_TRX:263,
    BTC_VIA:97,
    BTC_VTC:100,
    BTC_XCP:108,
    BTC_XEM:112,
    BTC_XMR:114,
    BTC_XPM:116,
    BTC_XRP:117,
    BTC_ZEC:178,
    BTC_ZRX:192,
    ETH_BAT:211,
    ETH_BCH:190,
    ETH_EOS:202,
    ETH_ETC:172,
    ETH_REP:176,
    ETH_ZEC:179,
    ETH_ZRX:193,
    USDC_ATOM:254,
    USDC_BCH:235,
    USDC_BCHABC:237,
    USDC_BCHSV:239,
    USDC_BTC:224,
    USDC_DASH:256,
    USDC_DOGE:243,
    USDC_EOS:257,
    USDC_ETC:258,
    USDC_ETH:225,
    USDC_GRIN:252,
    USDC_LTC:244,
    USDC_STR:242,
    USDC_TRX:264,
    USDC_USDT:226,
    USDC_XMR:241,
    USDC_XRP:240,
    USDC_ZEC:245,
    USDT_ATOM:255,
    USDT_BAT:212,
    USDT_BCH:191,
    USDT_BCHABC:260,
    USDT_BCHSV:259,
    USDT_BTC:121,
    USDT_DASH:122,
    USDT_DGB:262,
    USDT_DOGE:216,
    USDT_EOS:203,
    USDT_ETC:173,
    USDT_ETH:149,
    USDT_GNT:217,
    USDT_GRIN:261,
    USDT_LSK:218,
    USDT_LTC:123,
    USDT_MANA:231,
    USDT_NXT:124,
    USDT_QTUM:223,
    USDT_REP:175,
    USDT_SC:219,
    USDT_STR:125,
    USDT_TRX:265,
    USDT_XMR:126,
    USDT_XRP:127,
    USDT_ZEC:180,
    USDT_ZRX:220
}

const getCurrencyMarketPairValues = (currencyMarketPairs) => {
    return currencyMarketPairs.map((cmp) => {
        let currencyMarketPairString = `${cmp.market.toUpperCase()}_${cmp.currency.toUpperCase()}`;
        let currencyMarketPairValue = currencyMarketPairLookup[currencyMarketPairString];
        if(currencyMarketPairValue){
            let cmpv = Object.assign({}, cmp);
            cmpv.value = currencyMarketPairValue;
            return cmpv;
        } 
        console.log(`No Value for ${currencyMarketPairString}`);
    })
}

const exchange = 'poloniex';

//https://docs.poloniex.com/#24-hour-exchange-volume
const create = (openHandler, messageHandler, currencyMarketPairs) => {
    try {
        let socket = new WebSocket('wss://api2.poloniex.com');
        socket.addEventListener('open', event => {
            socket.send(JSON.stringify({ "command": "subscribe", "channel": 1002 }));
            openHandler(event);
        });

        let cmpVals = getCurrencyMarketPairValues(currencyMarketPairs);

        socket.addEventListener('message', event =>  {
            //[1002,null,[149,"142.00237449","142.01940599","141.88455199","0.04548655","10745362.25554395","77637.06335022",0,"143.32221188","134.20000006"]]
            let data = JSON.parse(event.data);
            
            if(data[0] == 1002 && data[2]){
                cmpVals.forEach(cmpVal => {
                    if(cmpVal){
                        if(data[2][0] == cmpVal.value){
                            //[ <id>, null, [ <currency pair id>, "<last trade price>", "<lowest ask>", "<highest bid>", "<percent change in last 24 hours>", "<base currency volume in last 24 hours>", "<quote currency volume in last 24 hours>", <is frozen>, "<highest trade price in last 24 hours>", "<lowest trade price in last 24 hours>" ], ... ]
                            
                            let response = {
                                exchange : exchange,
                                currency : cmpVal.currency,
                                market : cmpVal.market,
                                key : `${exchange}_${cmpVal.currency}_${cmpVal.market}`,
                                lastPrice : data[2][1],
                                buy : data[2][2],
                                sell : data[2][1],
                                timeStamp : '' + new Date()
                            }

                            messageHandler(response, null);
                            
                        }
                    }
                });
            }
        });

        return {
            destroy : () => {
                try{
                    socket.send(JSON.stringify({ "command": "unsubscribe", "channel": 1002 }));
                    socket.send(JSON.stringify({ "command": "unsubscribe", "channel": 1010}));
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