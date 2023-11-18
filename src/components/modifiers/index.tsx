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

    const [valor, setValor] = useState(0);

    const aumentarValor = () => {
        setValor(valor + 1);
    }

    const diminuirValor = () => {
        if (valor > 0){
            setValor(valor - 1);
        }
    }

    return(
        <article className={styles.container}>
            <div className={styles.row}>
                <div className={styles.pair}>
                    <div className={styles.buttons}>
                        <button 
                            className={styles.buttonMore}
                            onClick={aumentarValor}></button>
                        <button 
                            className={styles.buttonLess}
                            onClick={diminuirValor}></button>
                    </div>
                    <img src={D4} alt="Dado 4 Faces"/>
                    <h1>{valor}</h1>
                </div>
                <div className={styles.pair}>
                    <div className={styles.buttons}>
                        <button className={styles.buttonMore}></button>
                        <button className={styles.buttonLess}></button>
                    </div>
                    <img src={D6} alt="Dado 6 Faces"/>
                    <h1>0</h1>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.pair}>
                    <div className={styles.buttons}>
                        <button className={styles.buttonMore}></button>
                        <button className={styles.buttonLess}></button>
                    </div>
                    <img src={D8} alt="Dado 8 Faces"/>
                    <h1>0</h1>
                </div>
                <div className={styles.pair}>
                    <div className={styles.buttons}>
                        <button className={styles.buttonMore}></button>
                        <button className={styles.buttonLess}></button>
                    </div>
                    <img src={D10} alt="Dado 10 Faces"/>
                    <h1>0</h1>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.pair}>
                    <div className={styles.buttons}>
                        <button className={styles.buttonMore}></button>
                        <button className={styles.buttonLess}></button>
                    </div>
                    <img src={D12} alt="Dado 12 Faces"/>
                    <h1>0</h1>
                </div>
                <div className={styles.pair}>
                    <div className={styles.buttons}>
                        <button className={styles.buttonMore}></button>
                        <button className={styles.buttonLess}></button>
                    </div>
                    <img src={D20} alt="Dado 20 Faces"/>
                    <h1>0</h1>
                </div>
            </div>
            <div className={styles.finish}>
                <button className={styles.buttonRolar}>Rolar Dados</button>
                <h4>Esc para Sair</h4>
            </div>
            {/* <div className={styles.inp}>
                <h3>Modificadores:</h3>
                <div className={styles.inputs}>
                    <button className={styles.buttonMore}></button>
                    <input type="text" className={styles.input}/>
                </div>
                <div className={styles.inputs}>
                    <button className={styles.buttonLess}></button>
                    <input type="text" className={styles.input}/>
                </div>
                
            </div> */}
        </article>
    )
}