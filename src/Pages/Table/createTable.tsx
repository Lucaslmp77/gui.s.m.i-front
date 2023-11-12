import {useState} from "react";
import {RpgGameClient} from "../../client/rpg-game.client.ts";
import {Table} from "./table.tsx";
import {useNavigate} from "react-router-dom";


export const CreateTable = () =>{
    const [tableData, setTableData] = useState({
        sala: '',
        descricao: ''
    });
    const [error, setError] = useState("");
    const rpgGameClient = new RpgGameClient();
    const [visibility, setVisibility] = useState(false)
    const navigate = useNavigate();
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

        try{
            const table = {
                name: tableData.sala,
                description: tableData.descricao
            };
            const response = await rpgGameClient.save(table);
            response ? setVisibility(true) : setVisibility(false);
            navigate('/mesa');
        }
        catch (error){
            console.log(error)
        }
    }

    return(
        <section>
            <div>
                <h1>Criar</h1>
                <div>
                    <label>Nome da Sala</label>
                    <input value={tableData.sala} onChange={handleChange} type="text" name="sala" placeholder='Nome da sala'/>
                </div>
                <div>
                    <label>Descrição da sala</label>
                    <input value={tableData.descricao} onChange={handleChange}  name="descricao" type="text" placeholder='Descrição'/>
                </div>

                <button onClick={HandleSubmmit}>Criar</button>
            </div>
        </section>
    )
}