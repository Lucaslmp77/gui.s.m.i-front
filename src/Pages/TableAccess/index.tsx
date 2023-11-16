import React, { useEffect, useRef, useState } from 'react';
import socketIOClient, { io } from 'socket.io-client';
import { Decoded } from "../../models/decoded.ts";
import { jwtDecode } from "jwt-decode";
import { RpgGameClient } from "../../client/rpg-game.client.ts";
import { NavLink, useParams } from 'react-router-dom';
import styles from './styles.module.css';

import { BiPencil } from "react-icons/bi";
import { BsXLg } from "react-icons/bs";

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
        username: string;
        userId: string;
        dateH: string;
    }[]>([]);

    const [rpgGameName, setRpgGameName] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            rpgGameClient.findUnique(id).then(
                success => {

                    setRpgGameName(success.name);
                },
                error => {
                    console.log(error);
                }
            );
        }
        socket.on("connect", () => {
            socket.emit('join', id)
            console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
        });

        socket.on('message', (message) => {
            console.log(message)
            setMessageList(prevMessageList => [...prevMessageList, message]);
            console.log(messageList)
        });
        return () => { socket.off('message') }

    }, []);

    useEffect(() => {
        scrollDown();
    }, [messageList]);

    const handleSubmit = () => {
        const username = sessionStorage.getItem('username');
        const rpgGameId = id;
        const text = messageRef.current?.value;
        const authToken = sessionStorage.getItem('token');
        const dateH = new Date().toLocaleTimeString();
        let decoded: Decoded = {} as Decoded;

        if (authToken) {
            decoded = jwtDecode(authToken);
        }

        const userId = decoded.sub;
        const data = {
            username,
            text,
            userId,
            dateH
        };

        socket.emit('message', { room: rpgGameId, data });
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
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.title}>GUI.S.M.I</h1>
                <div className={styles.containerText}>
                    {messageList.map((message, index) => (
                        <p key={index}>[{message.dateH}] {'--'} <span className={styles.userMessage}>{message.username}</span>: {message.text}</p>
                    ))}
                    <div ref={bottomRef} />
                </div>

                <div className={styles.containerSendMessage}>
                    <input className={styles.inputMessage} type="text" ref={messageRef} onKeyDown={(e) => handleKeyPress(e)} placeholder="mensagem" />
                    <button className={styles.sendMessageButton} onClick={handleSubmit}>Enviar</button>
                </div>
            </div>
            <div className={styles.menu}>
                <NavLink to="/home-minhas-mesas">
                    <BsXLg className={styles.exitTable} />
                </NavLink>
                <BiPencil className={styles.editTable} />
            </div>
        </section>
    );
};