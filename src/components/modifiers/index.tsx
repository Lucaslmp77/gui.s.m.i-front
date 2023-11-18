import ReactModal from 'react-modal'
import styles from './styles.module.css'

import D4 from '../../assets/dice/D4.png'
import D6 from '../../assets/dice/D6.png'
import D8 from '../../assets/dice/D8.png'
import D10 from '../../assets/dice/D10.png'
import D12 from '../../assets/dice/D12.png'
import D20 from '../../assets/dice/D20.png'
import { useState } from 'react'

export const Modifiers = () => {

    const [valorD4, setValorD4] = useState(0);
    const [valorD6, setValorD6] = useState(0);
    const [valorD8, setValorD8] = useState(0);
    const [valorD10, setValorD10] = useState(0);
    const [valorD12, setValorD12] = useState(0);
    const [valorD20, setValorD20] = useState(0);

    const [modalDice,setModalDice] = useState(false);

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
    }

    const randomValues = () => {
        const dados = [
            {nome:'D4', lados:4, quantidade: valorD4},
            {nome:'D6', lados:6, quantidade: valorD6},
            {nome:'D8', lados:8, quantidade: valorD8},
            {nome:'D10', lados:10, quantidade: valorD10},
            {nome:'D12', lados:12, quantidade: valorD12},
            {nome:'D20', lados:20, quantidade: valorD20},
        ];

        const lancamento = (dado: any) => {
            const resultado = [];


            for(let i = 0; i < dado.quantidade; i++){
                const resultadoLancamento = Math.floor(Math.random() * dado.lados) + 1;
                resultado.push(resultadoLancamento);
            }
            return resultado;
        }
        
        let resultadoTotal = 0;

        dados.forEach((dado) => {
            if (dado.quantidade > 0){
                const resultado = lancamento(dado);
                const somaResultado = resultado.reduce((soma, valor) => soma + valor, 0);

                resultadoTotal += somaResultado;

                console.log(`${dado.quantidade}${dado.nome}: ${somaResultado} [${resultado.join(', ')}]`);    
            }
        });

        console.log('Total :',resultadoTotal);
        
        if (resultadoTotal !== 0){
            setModalDice(false);
        }

        setValorD4(0);
        setValorD6(0);
        setValorD8(0);
        setValorD10(0);
        setValorD12(0);
        setValorD20(0);


    }

    const styleModal = {
        overlay: {
            backgroundColor: 'transparent', // cor de fundo do overlay
        },
        content: {
            color: 'blue', // cor do texto do modal
            maxWidth: '400px', // largura máxima do modal
            maxHeight: '410px',
            margin: 'auto', // centraliza o modal horizontalmente
            padding: '20px', // espaço interno do modal
            border: "3px solid #32021F",
            radius: "15px",
        },
    }

    return(
        <div className={styles.full}>
            <button className={styles.iconDice} onClick={() => setModalDice(true)}></button>
            <ReactModal
                isOpen={modalDice}
                onRequestClose={() => setModalDice}
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
                            onClick={() => setModalDice(false)}
                            >Sair</button>
                    </div>
                </article>
            </ReactModal>
        </div>
    )
}