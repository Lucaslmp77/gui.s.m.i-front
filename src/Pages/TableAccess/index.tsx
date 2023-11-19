import React, { useEffect, useRef, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';
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
import Modal from "react-modal";

const ENDPOINT = 'http://localhost:3333/';

Modal.setAppElement('#root');
export const TableAccess = () => {

    const authToken = sessionStorage.getItem('token');
    let decoded: Decoded = {} as Decoded;

    if (authToken) {
        decoded = jwtDecode(authToken);
    }
    const nameAccount = decoded.name
    const userId = decoded.sub;
    const { id } = useParams();
    const socketRef = useRef<Socket | null>(null); // Usando MutableRefObject para permitir modificação e valor inicial null
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
    const [userList, setUserList] = useState<{ socket_id: string; name: string }[]>([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT, {
            transports: ['websocket']
        });
        socketRef.current = socket;

        // Cleanup function to disconnect the socket when the component is unmounted
        return () => {
            socket.disconnect();
        };
    }, []);

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

        const socket = socketRef.current;

        if (socket) {
            socket.on('connect', () => {
                socket.emit('join', { id, socketId: socket.id, name: nameAccount });
                console.log(socket.id);
            });

            socket.on('message', (message) => {
                setMessageList(prevMessageList => [...prevMessageList, message]);
            });

            socket.on('messageHistory', (message) => {
                message.forEach((dado: any) => {
                    setMessageListHistory(prevMessageList => [...prevMessageList, dado]);
                });
                socket.off('messageHistory');
            });

            socket.on('userList', (users) => {
                setUserList([])
                setUserList(users);
                //console.log(users);

            });

            return () => {
                socket.off('messageHistory');
                socket.off('message');
                socket.off('userList')
            };
        }
    }, [id, userList]);

    useEffect(() => {
        scrollDown();
    }, [messageList]);

    const handleSubmit = () => {
        const author = sessionStorage.getItem('name');
        const rpgGameId = id;
        const text = messageRef.current?.value;
        const dateH = new Date()
        const data = {
            author,
            text,
            userId,
            dateH,
            rpgGameId
        };

        const socket = socketRef.current;
        if (socket) {
            socket.emit('message', { room: rpgGameId, data });
            clearInput();
            focusInput();
        }
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
    };

    const scrollDown = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModalUsers() {
        setIsOpen(true);
    }

    function closeModalUsers() {
        setIsOpen(false);
    }

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
                    <div className={styles.containerIcon} onClick={openModalUsers}>
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
            <Modal
                className={styles.modal}
                isOpen={modalIsOpen}
                onAfterOpen={openModalUsers}
                onRequestClose={closeModalUsers}
                style={{
                    overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                },
                    content: {
                    maxWidth: "20%",
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "1px solid #333",
                    background: "transparent",
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    height: "50%"
                },
                }}
                contentLabel="Example Modal"
            >
                <div className={styles.formContainer}>

                    <div  className={styles.formModal}>
                        <h2>Usuários online</h2>
                        <ul>
                            {
                                userList.map((user, index) => (
                                    <li key={index}>{user.name}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </Modal>
        </section>
    );
};