import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import {Decoded} from "../../models/decoded.ts";
import {jwtDecode} from "jwt-decode";
import {RpgGame} from "../../models/rpg-game.ts";
import {RpgGameClient} from "../../client/rpg-game.client.ts";

const ENDPOINT = 'http://localhost:3333/';
type TableProps = {
    props: string;
};
export const Index = ({props}: TableProps) => {
    const socket = socketIOClient(ENDPOINT, {
        transports: ['websocket']
    });
    const id = props
    const rpgGameClient = new RpgGameClient();
    const messageRef = useRef<HTMLInputElement | null>(null);
    const bottomRef = useRef<HTMLInputElement | null>(null);
    let room = new RpgGame()
    const [messageList, setMessageList] = useState<{
        text: string; author: string; authorId: string, dateH: Date, room: string
    }[]>([]);

    useEffect(() => {
        rpgGameClient.findUnique(id).then(
            success => {
                room = success
            },
            error => {
                console.log(error)
            }
        )
        socket.emit("room", room)
        socket.on('message', (message) => {
            console.log(message)
            // Atualize o estado com o novo objeto recebido
            setMessageList(message);
            console.log(messageList)
        });
        return () => {socket.off('message')}
    }, []);

    useEffect(() => {
        scrollDown()
    }, [messageList]);

    const handleSubmit = () => {
        const username = sessionStorage.getItem('username');
        const rpgGameId = sessionStorage.getItem('rpgGameId');
        const text = messageRef.current?.value
        const authToken = sessionStorage.getItem('token');
        let decoded = Decoded;

        if (authToken) {
            decoded = jwtDecode(authToken);
        }

        const userId = decoded.sub;
        const data = {
            rpgGameId,
            username,
            text,
            userId
        }
        socket.emit('message', data);
        clearInput();
        focusInput()
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')
            handleSubmit();

    };

    const clearInput = () => {
        if (messageRef.current) {
            messageRef.current.value = '';
        }

    };

    const focusInput = () => {
        messageRef.current?.focus()
    }

    const scrollDown = () => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    return (
        <div>
            <h1>Chat</h1>
            {messageList.map((message, index) => (
                <p key={index}>{message.author}: {message.text}</p>
            ))}
            <div ref={bottomRef}/>
            <input type="text" ref={messageRef} onKeyDown={(e) =>handleKeyPress(e)} placeholder="mensagem" />
            <button onClick={handleSubmit}>Enviar</button>
        </div>
    );
};
