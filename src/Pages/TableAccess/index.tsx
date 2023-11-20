import React, { useEffect, useRef, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';
import { Decoded } from "../../models/decoded.ts";
import { jwtDecode } from "jwt-decode";
import { NavLink, useParams } from 'react-router-dom';
import styles from './styles.module.css';
import EditTableModal from '../../components/editTableModal/index.tsx';
import { BiPencil } from "react-icons/bi";
import { BsXLg } from "react-icons/bs";
import { GiIdCard } from "react-icons/gi";
import { TbCardsFilled } from "react-icons/tb";
import { GiRobotGolem } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { GiDiceSixFacesSix } from "react-icons/gi";
import Modal from "react-modal";
import ListNpcsModal from '../../components/listNpcsModal/index.tsx';
import { ModifiersModal } from '../../components/modifiers/index.tsx';
import D4 from "../../assets/dice/D4.png";
import D6 from "../../assets/dice/D6.png";
import D8 from "../../assets/dice/D8.png";
import D10 from "../../assets/dice/D10.png";
import D12 from "../../assets/dice/D12.png";
import D20 from "../../assets/dice/D20.png";
import ReactModal from "react-modal";

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
    const [userList, setUserList] = useState<{
        id: string, idPlayer: string, namePlayer: string, rpgGame:{id: string}}[]>([]);
    let cuPelinho:string
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT, {
            transports: ['websocket']
        });
        socketRef.current = socket;

        // Cleanup function to disconnect the socket when the component is unmounted

    }, []);

    useEffect(() => {

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
            });

            return () => {
                socket.off('messageHistory');
                socket.off('message');
                socket.off('userList')
                socket.disconnect();
            };
        }
    }, [id]);

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

    const [isModalNpcOpen, setIsModalNpcOpen] = useState(false);

    const openModalNpc = () => {
        setIsModalNpcOpen(true);
    };

    const closeModalNpc = () => {
        setIsModalNpcOpen(false);
    };

    const [diceModal, setDiceModaL] = useState(false);

    const openDiceModal = () => {
        setDiceModaL(true);
    }

    const closeDiceModal = () => {
        setDiceModaL(false);
    }

    const [diceResult, setDiceResult] = useState<number>(0);

    const handleDiceRoll = (result: number) => {
        setDiceResult(result);
    };

    const [valorD4, setValorD4] = useState(0);
    const [valorD6, setValorD6] = useState(0);
    const [valorD8, setValorD8] = useState(0);
    const [valorD10, setValorD10] = useState(0);
    const [valorD12, setValorD12] = useState(0);
    const [valorD20, setValorD20] = useState(0);
    //const [resultadoParcial, setResultadoParcial] = useState<string>('');

    type SetValueFunction = React.Dispatch<React.SetStateAction<number>>;

    const handleDiceValue = (
        setValue: SetValueFunction,
        currentValue: number,
        increment: number
    ) => {
        if (increment < 0 && currentValue === 0) {
            return;
        }
        setValue(currentValue + increment);
    };

    const randomValues = () => {
        const dados = [
            { nome: 'D4', lados: 4, quantidade: valorD4 },
            { nome: 'D6', lados: 6, quantidade: valorD6 },
            { nome: 'D8', lados: 8, quantidade: valorD8 },
            { nome: 'D10', lados: 10, quantidade: valorD10 },
            { nome: 'D12', lados: 12, quantidade: valorD12 },
            { nome: 'D20', lados: 20, quantidade: valorD20 },
        ];

        const lancamento = (dado: any) => {
            const resultado = [];

            for (let i = 0; i < dado.quantidade; i++) {
                const resultadoLancamento = Math.floor(Math.random() * dado.lados) + 1;
                resultado.push(resultadoLancamento);
            }
            return resultado;
        };

        let resultadoTotal = 0;

        dados.forEach((dado) => {
            if (dado.quantidade > 0) {
                const resultado = lancamento(dado);
                const somaResultado = resultado.reduce((soma, valor) => soma + valor, 0);

                resultadoTotal += somaResultado;

                const resultadoParcialAtual = `${dado.quantidade}${dado.nome}: ${somaResultado} [${resultado.join(', ')}]`;
                cuPelinho = resultadoParcialAtual;
                console.log(`${dado.quantidade}${dado.nome}: ${somaResultado} [${resultado.join(', ')}]`);

            }
        });

        if (resultadoTotal !== 0) {
            closeDiceModal();
        }

        setValorD4(0);
        setValorD6(0);
        setValorD8(0);
        setValorD10(0);
        setValorD12(0);
        setValorD20(0);
    };

    const styleModal = {
        overlay: {
            backgroundColor: 'transparent', // cor de fundo do overlay
        },
        content: {
            color: 'blue', // cor do texto do modal.
            maxWidth: '400px', // largura máxima do modal
            maxHeight: '450px',
            margin: 'auto', // centraliza o modal horizontalmente
            padding: '20px', // espaço interno do modal
            border: '3px solid #32021F',
            radius: '15px',
        },
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
                    <p>{cuPelinho}</p>
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
                        <GiRobotGolem className={styles.npc} onClick={openModalNpc} />
                        <p className={styles.textIcon}>NPCs</p>
                    </div>
                    <div className={styles.containerIcon}>
                        <GiDiceSixFacesSix className={styles.iconDice} onClick={openDiceModal}/>
                        <p className={styles.textIcon}>Dado</p>
                    </div>
                </div>
            </div>
            <ModifiersModal isOpen={diceModal} onRequestClose={closeDiceModal} onDiceRoll={handleDiceRoll} setResultadoParcial={setResultadoParcial} />
            <ListNpcsModal isOpen={isModalNpcOpen} onRequestClose={closeModalNpc} />
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
                            {userList.map((user, index) =>(
                                <li key={index}>{user.namePlayer}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Modal>
            <ReactModal
                isOpen={openDiceModal}
                onRequestClose={closeDiceModal}
                style={styleModal}
            >
                <article className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.pair}>
                            <div className={styles.buttons}>
                                <button
                                    className={styles.buttonMore}
                                    onClick={() => handleDiceValue(setValorD4, valorD4, 1)}></button>
                                <button
                                    className={styles.buttonLess}
                                    onClick={() => handleDiceValue(setValorD4, valorD4, -1)}></button>
                            </div>
                            <img src={D4} alt="Dado 4 Faces"/>
                            <h1>{valorD4}</h1>
                        </div>
                        <div className={styles.pair}>
                            <div className={styles.buttons}>
                                <button
                                    className={styles.buttonMore}
                                    onClick={() => handleDiceValue(setValorD6, valorD6, 1)}></button>
                                <button
                                    className={styles.buttonLess}
                                    onClick={() => handleDiceValue(setValorD6, valorD6, -1)}></button>
                            </div>
                            <img src={D6} alt="Dado 6 Faces"/>
                            <h1>{valorD6}</h1>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.pair}>
                            <div className={styles.buttons}>
                                <button
                                    className={styles.buttonMore}
                                    onClick={() => handleDiceValue(setValorD8, valorD8, 1)}></button>
                                <button
                                    className={styles.buttonLess}
                                    onClick={() => handleDiceValue(setValorD8, valorD8, -1)}></button>
                            </div>
                            <img src={D8} alt="Dado 8 Faces"/>
                            <h1>{valorD8}</h1>
                        </div>
                        <div className={styles.pair}>
                            <div className={styles.buttons}>
                                <button
                                    className={styles.buttonMore}
                                    onClick={() => handleDiceValue(setValorD10, valorD10, 1)}></button>
                                <button
                                    className={styles.buttonLess}
                                    onClick={() => handleDiceValue(setValorD10, valorD10, -1)}></button>
                            </div>
                            <img src={D10} alt="Dado 10 Faces"/>
                            <h1>{valorD10}</h1>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.pair}>
                            <div className={styles.buttons}>
                                <button
                                    className={styles.buttonMore}
                                    onClick={() => handleDiceValue(setValorD12, valorD12, 1)}></button>
                                <button
                                    className={styles.buttonLess}
                                    onClick={() => handleDiceValue(setValorD12, valorD12, -1)}></button>
                            </div>
                            <img src={D12} alt="Dado 12 Faces"/>
                            <h1>{valorD12}</h1>
                        </div>
                        <div className={styles.pair}>
                            <div className={styles.buttons}>
                                <button
                                    className={styles.buttonMore}
                                    onClick={() => handleDiceValue(setValorD20, valorD20, 1)}></button>
                                <button
                                    className={styles.buttonLess}
                                    onClick={() => handleDiceValue(setValorD20, valorD20, -1)}></button>
                            </div>
                            <img src={D20} alt="Dado 20 Faces"/>
                            <h1>{valorD20}</h1>
                        </div>
                    </div>
                    <div className={styles.finish}>
                        <button
                            className={styles.buttonRolar}
                            onClick={randomValues}
                        >Rolar Dados</button>
                        <button
                            className={styles.buttonSair}
                            onClick={closeDiceModal}
                        >Sair</button>
                    </div>
                </article>
            </ReactModal>
        </section>
    );
};