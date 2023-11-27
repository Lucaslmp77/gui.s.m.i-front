import ReactModal from 'react-modal';
import styles from './styles.module.css';
import D4 from '../../assets/dice/D4.png';
import D6 from '../../assets/dice/D6.png';
import D8 from '../../assets/dice/D8.png';
import D10 from '../../assets/dice/D10.png';
import D12 from '../../assets/dice/D12.png';
import D20 from '../../assets/dice/D20.png';
import { useState } from 'react';

import more from '../../assets/dice/MAIS.png'
import less from '../../assets/dice/MENOS.png'

interface ModifiersProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onDiceRoll: (resultado: number) => void;
    setResultadoParcial: React.Dispatch<React.SetStateAction<string>>;
    functionSubmit:Function
}

export const ModifiersModal: React.FC<ModifiersProps> = ({ isOpen, onRequestClose, onDiceRoll, setResultadoParcial,functionSubmit }) => {
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

                const resultadoParcialAtual = `${dado.quantidade}${dado.nome}: [${resultado.join(', ')}] `;
                setResultadoParcial((prevResultado) => prevResultado + resultadoParcialAtual + resultadoTotal);                
            }
        });
        
        if (resultadoTotal !== 0) {
            onRequestClose();
            onDiceRoll(resultadoTotal);
        }
        functionSubmit();
        
        setValorD4(0);
        setValorD6(0);
        setValorD8(0);
        setValorD10(0);
        setValorD12(0);
        setValorD20(0);
    };

    const styleModal = {
        overlay: {
            backgroundColor: 'transparent', 
        },
        content: {
            backgroundColor: '#22223B',
            color: '#FFEAAE',
            maxWidth: '400px', // largura máxima do modal
            maxHeight: '450px',
            margin: 'auto', // centraliza o modal horizontalmente
            padding: '20px', // espaço interno do modal
            border: '5px white solid',
            borderRadius: '25px'
            
        },
    };

    return(
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={styleModal}
        >
            <article className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.pair}>
                        <div className={styles.buttons}>
                            <img src={more} className={styles.buttonMore} onClick={() => handleDiceValue(setValorD4, valorD4, 1)}/>
                            <img src={less} className={styles.buttonLess} onClick={() => handleDiceValue(setValorD4, valorD4, -1)}/>
                        </div>
                        <img src={D4} alt="Dado 4 Faces"/>
                        <h1>{valorD4}</h1>
                    </div>
                    <div className={styles.pair}>
                        <div className={styles.buttons}>
                            <img src={more} className={styles.buttonMore} onClick={() => handleDiceValue(setValorD6, valorD6, 1)}/>
                            <img src={less} className={styles.buttonLess} onClick={() => handleDiceValue(setValorD6, valorD6, -1)}/>
                        </div>
                        <img src={D6} alt="Dado 6 Faces"/>
                        <h1>{valorD6}</h1>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.pair}>
                        <div className={styles.buttons}>
                            <img src={more} className={styles.buttonMore} onClick={() => handleDiceValue(setValorD8, valorD8, 1)}/>
                            <img src={less} className={styles.buttonLess} onClick={() => handleDiceValue(setValorD8, valorD8, -1)}/>
                        </div>
                        <img src={D8} alt="Dado 8 Faces"/>
                        <h1>{valorD8}</h1>
                    </div>
                    <div className={styles.pair}>
                        <div className={styles.buttons}>
                            <img src={more} className={styles.buttonMore} onClick={() => handleDiceValue(setValorD10, valorD10, 1)}/>
                            <img src={less} className={styles.buttonLess} onClick={() => handleDiceValue(setValorD10, valorD10, -1)}/>
                        </div>
                        <img src={D10} alt="Dado 10 Faces"/>
                        <h1>{valorD10}</h1>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.pair}>
                        <div className={styles.buttons}>
                            <img src={more} className={styles.buttonMore} onClick={() => handleDiceValue(setValorD12, valorD12, 1)}/>
                            <img src={less} className={styles.buttonLess} onClick={() => handleDiceValue(setValorD12, valorD12, -1)}/>
                        </div>
                        <img src={D12} alt="Dado 12 Faces"/>
                        <h1>{valorD12}</h1>
                    </div>
                    <div className={styles.pair}>
                        <div className={styles.buttons}>
                            <img src={more} className={styles.buttonMore} onClick={() => handleDiceValue(setValorD20, valorD20, 1)}/>
                            <img src={less} className={styles.buttonLess} onClick={() => handleDiceValue(setValorD20, valorD20, -1)}/>
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
                        onClick={onRequestClose}
                        >Sair</button>
                </div>
            </article>
        </ReactModal>
    )
}
