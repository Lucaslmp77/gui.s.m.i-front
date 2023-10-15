import { NavLink } from "react-router-dom"
import styles from "./styles.module.css"


export const Register = () => {
    return (
        <section>
            <div className={styles.secondContent}>
                <div className={styles.secondColum}>
                    <h2 className={styles.title2}>Crie Sua Conta</h2>
                    <form className={styles.form}>
                        <input type="text" placeholder="Login"/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Senha"/>
                        <input type="password" placeholder="Confirmar Senha"/>
                    </form>
                    <button className={styles.butt2}>CADASTRE-SE</button>
                </div>
                <div className={styles.firstColum}>
                    <h2 className={styles.title}>Possui uma conta ?</h2>
                    <p className={styles.description}>Crie sua conta para embarcar em uma jornada épica.</p>
                    <p className={styles.description}>Caso tenha uma conta, faça o login abaixo</p>
                    <NavLink to={`/Login`}>
                        <button className={styles.butt}>ENTRAR</button>=
                    </NavLink>
                </div>
            </div>
        </section>
    )
} 