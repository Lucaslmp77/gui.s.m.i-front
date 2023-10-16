import styles from "./styles.module.css"

import { NavLink } from "react-router-dom"

export const Register = () => {
    return (
        <section className={styles.conteiner}>
            <div className={styles.conteinerHome}>
                <div className={styles.firstContent}>
                    <div className={styles.secondColum}>
                        <h2 className={styles.title2}>Crie Sua Conta</h2>
                        <div className={styles.form}>
                            <div className={styles.inputs}> 
                                <label>Login</label>
                                <input type="text"/>
                            </div>
                            <div className={styles.inputs}> 
                                <label>Email</label>
                                <input type="text"/>
                            </div>
                            <div className={styles.inputs}>
                                <label>Senha</label>
                                <input type="password"/>
                            </div>
                            <div className={styles.inputs}>
                                <label>Confirmar Senha</label>
                                <input type="password"/>
                            </div>
                        </div>
                        <button className={styles.butt2}>CADASTRE-SE</button>
                    </div>
                    <div className={styles.firstColum}>
                        <h2 className={styles.title}>Possui uma conta ?</h2>
                        <p className={styles.description}>Crie sua conta para embarcar em uma jornada épica.</p>
                        <p className={styles.description}>Caso tenha uma conta, faça o login abaixo</p>
                        <NavLink to={`/Login`} className={styles.butt_fat}>
                            <button className={styles.butt}>ENTRAR</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
    )
} 