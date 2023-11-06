import { useState } from 'react';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';
import { AuthenticateClient } from '../../client/authenticate.client';

export const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState("");

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
        setError("");
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const authenticateClient = new AuthenticateClient();

        try {
            const authenticateData = {
                email: loginData.email,
                password: loginData.password,
            };

            const response = await authenticateClient.authenticate(authenticateData);

            // Verifique a resposta do servidor aqui e aja de acordo com o sucesso ou erro.
            // Você pode redirecionar o usuário ou exibir uma mensagem de sucesso.

            console.log('Autenticação bem-sucedida:', response);
        } catch (error) {
            // Trate os erros retornados pela API de autenticação
            setError('Autenticação falhou. Por favor, verifique suas credenciais.');
            console.error('Erro de autenticação:', error);
        }
    };

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
                        {error && <div className={styles.error}>{error}</div>}

                            <div className={styles.inputs}>
                                <label>Login</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.inputs}>
                                <label>Senha</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <button className={styles.butt2} onClick={handleSubmit}>ENTRAR</button>
                    </div>
                </div>
            </div>
        </section>
    );
};