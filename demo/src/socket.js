import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import webSocket from 'socket.io-client'


const Socket = (props) => {
    const [ws, setWs] = useState(null)
    const [IP, setIP] = useState('192.168.0.126:3000')

    const connectWebSocket = () => {
        //開啟
        setWs(webSocket('http://' + IP))
    }


    useEffect(() => {
        if (ws) {
            //連線成功在 console 中打印訊息
            console.log('success connect!')
            //設定監聽
            initWebSocket()
        }
    }, [ws])

    const initWebSocket = () => {
        //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
        ws.on('getMessage', message => {
            console.log(message)
        })
    }

    const sendMessage = () => {
        //以 emit 送訊息，並以 getMessage 為名稱送給 server 捕捉
        ws.emit('getMessage', props.children);
    }



    //connectWebSocket();
    return (
        <div>
            <h2>setup IP</h2>
            <input type="text" value={IP} onChange={(event) => {setIP(event.target.value)}} />
            <br />
            <br />
            <input type='button' value='連線' onClick={connectWebSocket} />
            <input type='button' value='送出訊息' onClick={sendMessage} />
        </div>
    )
}



export default Socket;