import ReactModal from 'react-modal'
import styles from './styles.module.css'

import D4 from '../../assets/dice/D4.png'
import D6 from '../../assets/dice/D6.png'
import D8 from '../../assets/dice/D8.png'
import D10 from '../../assets/dice/D10.png'
import D12 from '../../assets/dice/D12.png'
import D20 from '../../assets/dice/D20.png'

export const Modifiers = () => {
    return(
            <article className={styles.container}>
            <div className={styles.row}>
                <div className={styles.pair}>
                    <img src={D4} alt="Dado 4 Faces"/>
                    <h1>0</h1>
                </div>
                <div className={styles.pair}>
                    <img src={D6} alt="Dado 6 Faces"/>
                    <h1>0</h1>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.pair}>
                    <img src={D8} alt="Dado 8 Faces"/>
                    <h1>0</h1>
                </div>
                <div className={styles.pair}>
                    <img src={D10} alt="Dado 10 Faces"/>
                    <h1>0</h1>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.pair}>
                    <img src={D12} alt="Dado 12 Faces"/>
                    <h1>0</h1>
                </div>
                <div className={styles.pair}>
                    <img src={D20} alt="Dado 20 Faces"/>
                    <h1>0</h1>
                </div>
            </div>
            <div>
                <h3 className={styles.modi}>Modificadores:</h3>
                <div className={styles.inputs}>
                    <img src="" alt="" />
                    <input type="text" />
                </div>
                <div className={styles.inputs}>
                    <img src="" alt="" />
                    <input type="text" />
                </div>
            </div>
            <div>
                <button>Rolar Dados</button>
                <h4>Esc para Sair</h4>
            </div>
        </article>
    )
}