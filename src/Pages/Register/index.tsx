import styles from "./styles.module.css"

import { NavLink } from "react-router-dom"

export const Register = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <form className={styles.form}>
                    <h2 className={styles.title}>Crie Sua Conta</h2>
                    <div className={styles.inputs}>
                        <label>Username</label>
                        <input type="text" />
                    </div>
                    <div className={styles.inputs}>
                        <label>Email</label>
                        <input type="text" />
                    </div>
                    <div className={styles.inputs}>
                        <label>Senha</label>
                        <input type="password" />
                    </div>
                    <div className={styles.inputs}>
                        <label>Confirmar Senha</label>
                        <input type="password" />
                    </div>

                    <button className={styles.butt}>Cadastre-se</button>
                </form>
                <footer className={styles.footer}>
                    <p className={styles.text}> Já possui uma conta ?</p>
                    <NavLink to={`/`}>
                        <button className={styles.butt}>Entrar</button>
                    </NavLink>
                </footer>
            </div>
        </section >
    )
} 