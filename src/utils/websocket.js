let Socket = ''
let setIntervalWesocketPush = null
let notSocket = false;
/**
 *
 * @param {string} url wsURL
 */
export const createSocket = (url, onmessage) => {
    notSocket = false
    Socket && Socket.close()
    if (!Socket) {

        Socket = new WebSocket(url)
        Socket.onopen = onopenWS
        Socket.onmessage = onmessage
        Socket.onerror = onerrorWS
        Socket.onclose = oncloseWS
    } else {
        console.log('websocket——init')
    }
}


const onopenWS = () => {
    sendPing()
}


const onerrorWS = () => {

    Socket.close()
    clearInterval(setIntervalWesocketPush)

    if (Socket.readyState !== 3) {
        Socket = null
        createSocket()
    }
}



const connecting = message => {
    setTimeout(() => {
        if (Socket.readyState === 0) {
            connecting(message)
        } else {
            Socket.send(JSON.stringify(message))
        }
    }, 1000)
}


export const sendWSPush = message => {
    if (Socket !== null && Socket.readyState === 3) {
        Socket.close()
        createSocket()
    } else if (Socket.readyState === 1) {
        Socket.send(JSON.stringify(message))
    } else if (Socket.readyState === 0) {
        connecting(message)
    }
}


const oncloseWS = () => {
    clearInterval(setIntervalWesocketPush)
    if (notSocket) {
        return;
    }

    if (Socket.readyState !== 2) {
        Socket = null
        createSocket()
    }
}
export const closeSocket=()=>{
    notSocket=true;
    Socket && Socket.close()
}


export const sendPing = (time = 5000, ping = 'ping') => {
    clearInterval(setIntervalWesocketPush)
    Socket.send(ping)
    setIntervalWesocketPush = setInterval(() => {
        Socket.send(ping)
    }, time)
}
