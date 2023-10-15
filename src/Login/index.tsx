import styles from './styles.module.css';

export const Login = () => {
    return (
        <section className={styles.conteiner}>
            <div className={styles.conteinerHome}>
                <div className={styles.firstContent}>
                    <div className={styles.firstColum}>
                        <h2 className={styles.title}>Bem-vindo de volta</h2>
                        <p className={styles.description}>Por favor, faça o login para acessar sua conta</p>
                        <p className={styles.description}>Caso não tenha uma conta, efetue o cadastro abaixo</p>
                        <button className={styles.butt}>CADASTRE-SE</button>
                    </div>
                    <div className={styles.secondColum}>
                        <h2 className={styles.title2}>Faça Seu Login</h2>
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