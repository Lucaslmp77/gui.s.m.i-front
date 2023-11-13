import socketIOClient from 'socket.io-client';
import {useEffect, useState} from "react";

const ENDPOINT = 'http://localhost:3333/';

export const Tables = () => {
    const [usersRoom, setUsersRoom] = useState<{
        text: string; author: string; authorId: string, dateH: Date, room: string
    }[]>([])
    const socket = socketIOClient(ENDPOINT, {
        transports: ['websocket']
    });
    const lista: string = "lista"
    useEffect(() => {
        console.log('entrou no useeffect')
        socket.emit('list', lista)
        socket.on('message', (message) => {
            console.log(message)
            // Atualize o estado com o novo objeto recebido
            setUsersRoom(message);
            console.log(usersRoom)
        });
        return () => {socket.off('message')}
    }, []);


    return (
        <div>
            {
                usersRoom.map((rooms, index) => (
                    <p key={index}>{rooms.room}</p>
                ))
            }
        </div>
    )
}