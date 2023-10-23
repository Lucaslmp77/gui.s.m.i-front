import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';

export const Login = () => {
    return (
        <section className={styles.conteiner}>
            <div className={styles.conteinerHome}>
                <div className={styles.firstContent}>
                    <div className={styles.firstColum}>
                        <h1 className={styles.title}>GUI.S.M.I</h1>
                        <h2 className={styles.subtitle}>Bem-vindo</h2>
                        <p className={styles.description}>Novo por aqui? Cadastre-se agora e comece sua aventura</p>
                        <NavLink to={`/Register`} className={styles.butt_fat}>
                            <button className={styles.butt}>CADASTRE-SE</button>
                        </NavLink>
                    </div>
                    <div className={styles.secondColum}>
                        <h2 className={styles.title2}>Faça seu login</h2>
                        <div className={styles.form}>
                            <div className={styles.inputs}> 
                                <label>Login</label>
                                <input type="text"/>
                            </div>
                            <div className={styles.inputs}>
                                <label>Senha</label>
                                <input type="password"/>
                            </div>
                        </div>
                        <button className={styles.butt2}>ENTRAR</button>
                    </div>
                </div>
            </div>
        </section>
    )
} 