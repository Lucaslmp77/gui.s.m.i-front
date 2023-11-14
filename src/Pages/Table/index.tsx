import {useRef, useState} from "react";
import {RpgGameClient} from "../../client/rpg-game.client.ts";


export const CreateTable = () =>{

    const messageRef = useRef<HTMLInputElement | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const rpgGameClient = new RpgGameClient();
    const [rpgGame, setRpgGame] = useState({ name: '', description: '' });
    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setRpgGame({ ...rpgGame, [event.target.name]: event.target.value });
    };


    const HandleSubmmit = async(e: { preventDefault: () => void; }) =>{
        e.preventDefault();

        try {
            await rpgGameClient.save(rpgGame);
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
                    <input ref={messageRef} onChange={handleChange}  type="text" name="name" placeholder='Nome da sala'/>
                </div>
                <div>
                    <label>Descrição da sala</label>
                    <input  onChange={handleChange} name="description" type="text" placeholder='Descrição'/>
                </div>

                <button onClick={HandleSubmmit}>Criar</button>
                <p>{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}</p>
            </div>
        </section>
    )
}