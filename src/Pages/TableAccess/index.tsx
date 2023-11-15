import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { Decoded } from "../../models/decoded.ts";
import { jwtDecode } from "jwt-decode";
import { RpgGameClient } from "../../client/rpg-game.client.ts";
import { useParams } from 'react-router-dom';

const ENDPOINT = 'http://localhost:3333/';

export const TableAccess = () => {
    const { id } = useParams();
    const socket = socketIOClient(ENDPOINT, {
        transports: ['websocket']
    });
    const rpgGameClient = new RpgGameClient();
    const messageRef = useRef<HTMLInputElement | null>(null);
    const bottomRef = useRef<HTMLInputElement | null>(null);
    const [messageList, setMessageList] = useState<{
        text: string;
        author: string;
        authorId: string;
        dateH: Date;
        room: string;
    }[]>([]);

    const [rpgGameName, setRpgGameName] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            rpgGameClient.findUnique(id).then(
                success => {
                    socket.emit("room", success);

                    setRpgGameName(success.name);
                },
                error => {
                    console.log(error);
                }
            );
        }

        socket.on('message', (messages) => {
            console.log('Nova mensagem recebida:', messages);
            setMessageList((prevMessages) => [
                ...messages.map((message: any) => ({
                    text: message.text,
                    author: message.author,
                    authorId: message.authorId,
                    dateH: new Date(message.dateH),
                    room: message.room,
                })),
            ]);
        });

        return () => {
            socket.off('message');
        };

    }, [id]);

    useEffect(() => {
        scrollDown();
    }, [messageList]);

    const handleSubmit = () => {
        const username = sessionStorage.getItem('username');
        const rpgGameId = id;
        const text = messageRef.current?.value;
        const authToken = sessionStorage.getItem('token');

        let decoded: Decoded = {} as Decoded;

        if (authToken) {
            decoded = jwtDecode(authToken);
        }

        const userId = decoded.sub;
        const data = {
            rpgGameId,
            username,
            text,
            userId
        };

        socket.emit('message', data);
        clearInput();
        focusInput();
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
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div>
            <h1>Chat na Mesa: {rpgGameName}</h1>
            {messageList.map((message, index) => (
                <p key={index}>{message.author}: {message.text}</p>
            ))}
            <div ref={bottomRef} />
            <input type="text" ref={messageRef} onKeyDown={(e) => handleKeyPress(e)} placeholder="mensagem" />
            <button onClick={handleSubmit}>Enviar</button>
        </div>
    );
};
