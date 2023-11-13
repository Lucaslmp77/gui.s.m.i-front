import {useEffect, useRef, useState} from "react";
import {RpgGameClient} from "../../client/rpg-game.client.ts";
import {useNavigate} from "react-router-dom";
import socketIOClient from 'socket.io-client';
import {Decoded} from "../../models/decoded.ts";
import {jwtDecode} from "jwt-decode";

const ENDPOINT = 'http://localhost:3333/';

export const CreateTable = () =>{
    const [tableData, setTableData] = useState({
        sala: '',
        descricao: ''
    });
    const messageRef = useRef<HTMLInputElement | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const socket = socketIOClient(ENDPOINT, {
        transports: ['websocket']
    });
    const [error, setError] = useState("");
    const rpgGameClient = new RpgGameClient();
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username');

    useEffect(() => {
        return () => {
            socket.off('error');
            socket.off('message')
        };
    }, []);
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setTableData({
            ...tableData,
            [name]: value,
        });
        setError("");
        console.log(error)
    };

    const HandleSubmmit = async(e: { preventDefault: () => void; }) =>{
        e.preventDefault();
        const authToken = sessionStorage.getItem('token');
        let decoded = Decoded;

        if (authToken) {
            decoded = jwtDecode(authToken);
        }

        const userId = decoded.sub;

        try {
            const table = {
                username: username,
                room: tableData.sala,
                description: tableData.descricao,
                id_user: userId
            };
            console.log(table)
            socket.emit("mesa", { table });
            socket.on("error", (response) => {
                console.log(response)
                setErrorMessage(response)
                sessionStorage.setItem("room", table.room);
                sessionStorage.setItem("description", table.description);
                navigate("/mesa");
                socket.off('error')

            });
            const response = await rpgGameClient.save(table);
            console.log(response)
        } catch (error) {
            console.log(error);
        }

    }

    return(
        <section>
            <div>
                <h1>Criar</h1>
                <div>
                    <label>Nome da Sala</label>
                    <input ref={messageRef} value={tableData.sala} onChange={handleChange} type="text" name="sala" placeholder='Nome da sala'/>
                </div>
                <div>
                    <label>Descrição da sala</label>
                    <input value={tableData.descricao} onChange={handleChange}  name="descricao" type="text" placeholder='Descrição'/>
                </div>

                <button onClick={HandleSubmmit}>Criar</button>
                <p>{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}</p>
            </div>
        </section>
    )
}