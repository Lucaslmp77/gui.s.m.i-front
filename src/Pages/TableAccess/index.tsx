import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { Decoded } from "../../models/decoded.ts";
import { jwtDecode } from "jwt-decode";
import { RpgGameClient } from "../../client/rpg-game.client.ts";
import { NavLink, useParams } from 'react-router-dom';
import styles from './styles.module.css';
import EditTableModal from '../../components/editTableModal/index.tsx';

import { BiPencil } from "react-icons/bi";
import { BsXLg } from "react-icons/bs";
import { GiIdCard } from "react-icons/gi";
import { TbCardsFilled } from "react-icons/tb";
import { GiRobotGolem } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";

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
        userId: string;
        dateH: Date;
    }[]>([]);
    const [messageListHistory, setMessageListHistory] = useState<{
        text: string;
        author: string;
        userId: string;
        dateH: Date;
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
        socket.on('messageHistory', (message) => {
            message.forEach((dado: any) => {
                setMessageListHistory(prevMessageList => [...prevMessageList, dado]);
            })
            socket.off('messageHistory')
        })
        return () => { socket.off('messageHistory'); socket.off('message') }

    }, []);

    useEffect(() => {
        scrollDown();
    }, [messageList]);

    const handleSubmit = () => {
        const author = sessionStorage.getItem('name');
        const rpgGameId = id;
        const text = messageRef.current?.value;
        const authToken = sessionStorage.getItem('token');
        const dateH = new Date()
        let decoded: Decoded = {} as Decoded;

        if (authToken) {
            decoded = jwtDecode(authToken);
        }

        const userId = decoded.sub;
        const data = {
            author,
            text,
            userId,
            dateH,
            rpgGameId
        };

        socket.emit('message', { room: rpgGameId, data });
        clearInput();
        focusInput();

    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (messageRef.current?.value.trim() !== '') {
                handleSubmit();
            }
        }
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.title}>GUI.S.M.I</h1>
                <div className={styles.containerText}>
                    {messageListHistory.map((message, index) => {
                        const date = new Date(message.dateH);
                        return (
                            <p key={index}>[{date.toLocaleString()}] {'--'} <span className={styles.userMessage}>{message.author}</span>: {message.text}</p>
                        );
                    })}
                    {messageList.map((message, index) => {
                        const date = new Date(message.dateH);
                        return (
                            <p key={index}>[{date.toLocaleString()}] {'--'} <span className={styles.userMessage}>{message.author}</span>: {message.text}</p>
                        );
                    })}
                    <div ref={bottomRef} />
                </div>

                <div className={styles.containerSendMessage}>
                    <input className={styles.inputMessage} type="text" ref={messageRef} onKeyDown={(e) => handleKeyPress(e)} placeholder="mensagem" />
                    <button className={styles.sendMessageButton} onClick={handleSubmit}>Enviar</button>
                </div>
            </div>
            <div className={styles.containerMenuNavigation}>
                <div className={styles.exit}>
                    <NavLink to="/home-minhas-mesas">
                        <BsXLg className={styles.exitTable} />
                    </NavLink>
                </div>
                <div className={styles.menu}>
                    <div className={styles.containerIcon}>
                        <BiPencil className={styles.editTable} onClick={openModal} />
                        <p className={styles.textIcon}>Editar mesa</p>
                    </div>
                    <div className={styles.containerIcon}>
                        <GiIdCard className={styles.createCharacter} />
                        <p className={styles.textIcon}>Criar ficha</p>
                    </div>
                    <div className={styles.containerIcon}>
                        <TbCardsFilled className={styles.myCharacters} />
                        <p className={styles.textIcon}>Minhas fichas</p>
                    </div>
                    <div className={styles.containerIcon}>
                        <FaUsers className={styles.users} />
                        <p className={styles.textIcon}>Usuários</p>
                    </div>
                    <div className={styles.containerIcon}>
                        <GiRobotGolem className={styles.npc} />
                        <p className={styles.textIcon}>NPC</p>
                    </div>
                </div>
            </div>
            <EditTableModal isOpen={isModalOpen} onRequestClose={closeModal} />
        </section>
    );
};