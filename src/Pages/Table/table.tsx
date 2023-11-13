import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3333/';

export const Table = () => {
    const socket = socketIOClient(ENDPOINT, {
        transports: ['websocket']
    });
    const messageRef = useRef<HTMLInputElement | null>(null);
    const bottomRef = useRef<HTMLInputElement | null>(null);
    const [messageList, setMessageList] = useState<{
        text: string; author: string; authorId: string, dateH: Date, room: string
    }[]>([]);

    useEffect(() => {
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
        const room = sessionStorage.getItem('room');
        const text = messageRef.current?.value
        const data = {
            room,
            username,
            text
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
