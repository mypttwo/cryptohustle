
const create = (openHandler, messageHandler) => {

    let socket = new WebSocket('wss://stream.binance.com:9443/ws');
    socket.addEventListener('open', event => {
        socket.send(JSON.stringify({
            "method": "SUBSCRIBE",
            "params":
            [
            "btcusdt@ticker"
            ],
            "id": 1
            }));
        openHandler(event);
    });

    socket.addEventListener('message', event =>  {
        messageHandler(event.data, null);
    });
}

export {create};