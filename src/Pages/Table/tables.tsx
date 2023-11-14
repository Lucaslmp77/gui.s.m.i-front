import {useEffect, useState} from "react";
import {RpgGameClient} from "../../client/rpg-game.client.ts";
import {RpgGame} from "../../models/rpg-game.ts";

export const Tables = () => {
    const [Rooms, setRooms] = useState<RpgGame[]>()
    let idRoom = ''
    const rpgGameClient = new RpgGameClient();


    useEffect(() => {
        rpgGameClient.findAll().then(
            success => {
                setRooms([success]);
            },
            error => {
                console.log(error)
            }
        )
    }, []);

    const [mostrarTabela, setMostrarTabela] = useState(false); // estado para controlar a renderização da tabela

    const handleClick = (id: string) => {
        setMostrarTabela(true); // atualiza o estado para mostrar a tabela quando o botão é clicado
        idRoom = id
    };

    return (
        <div>
            {
                Rooms?.map((rooms, index) => (
                    <div >
                        <p key={index}>{rooms.name}</p>
                        <p>{rooms.description}</p>
                        <button onClick={() =>handleClick(rooms.id)}>Entrar</button>
                    </div>
                ))
            }
        </div>

    )
}