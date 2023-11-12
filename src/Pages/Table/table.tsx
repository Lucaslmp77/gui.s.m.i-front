import useWebSocket from 'react-use-websocket';
import {useEffect} from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3333/";
export const Table = () =>{


    useEffect(() =>{
        const socket = socketIOClient(ENDPOINT, {
            transports: ['websocket']
        });
    },[])

    return (
        <div>
            teste
        </div>
    )
}