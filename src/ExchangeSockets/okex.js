import pako from 'pako';

const create = ( openHandler, messageHandler) => {
    let socket = new WebSocket('wss://real.okex.com:8443/ws/v3');
    socket.binaryType = "arraybuffer";
    socket.addEventListener('open', event => {
        console.log(event);
        socket.send(JSON.stringify({"op": "subscribe", "args": ["spot/ticker:ETH-USDT"]}));
        openHandler(event);
    });

    socket.addEventListener('message', event =>  {
        console.log('Message from okex ', event.data);
        if (event instanceof String) {
            console.log(event.data);
        } else {
            try {
                let inflatedMsg = pako.inflateRaw(event.data, {to: 'string'});
                console.log(inflatedMsg);
                messageHandler(inflatedMsg, null);
            } catch (err) {
                messageHandler(null, err)
            }
        }
    });
}

export {create};