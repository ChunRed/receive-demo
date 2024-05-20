import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import webSocket from 'socket.io-client'
import Create from "./Create";


const Socket = ({msg, setMsg}) => {
    const [ws, setWs] = useState(null)
    const [listValue, setListValue] = useState('');
    const [serverState, setServerState] = useState('disconnect server');


    const [IP, setIP] = useState('https://receive-demo.onrender.com');
    //const [IP, setIP] = useState('http://192.168.0.126:3000');



    const connectWebSocket = () => {
        //開啟
        setWs(webSocket(IP))
    }


    useEffect(() => {
        if (ws) {
            //連線成功在 console 中打印訊息
            console.log('success connect!')
            //設定監聽
            ws.on('getMessage', message => {
                setMsg(message);
                console.log(message);
    
            })

            ws.on('start',(msg) => {
                setServerState('connect server');
            })
        }
    }, [ws])



    const sendMessage = () => {
        //以 emit 送訊息，並以 getMessage 為名稱送給 server 捕捉
        const timestamp = (new Date).getTime();
        ws.emit('getMessage', listValue);
    }


    return (
        <div className='text-center ' >
            <input className='mt-5 btn btn-outline-dark' type='button' value='connect server' onClick={connectWebSocket} />

            <h3 className="text-dark mt-3" >{serverState}</h3>

            <input className='mt-5 btn btn-outline-dark' type='button' value='送出訊息' onClick={sendMessage} />

            <Create
                list={listValue}
                setList={setListValue}
            />

        </div>
    )
}



export default Socket;