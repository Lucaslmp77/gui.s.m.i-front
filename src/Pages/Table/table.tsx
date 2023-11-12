import useWebSocket from 'react-use-websocket';
import {useEffect} from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3333/";
export const Table = () =>{
    const socket = socketIOClient(ENDPOINT, {
        transports: ['websocket']
    });

    const username = sessionStorage.getItem('username')
    socket.emit('username',username);

    return (
        <div>
            teste
        </div>
    )
}