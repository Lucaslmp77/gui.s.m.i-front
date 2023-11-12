import { useState } from 'react';
import styles from './styles.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
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

    const setCookie = (name: string, value: string, expiresInMillis: number) => {
        const date = new Date();
        date.setTime(date.getTime() + expiresInMillis);
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    };

    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const authenticateClient = new AuthenticateClient();

        try {
            const authenticateData = {
                email: loginData.email,
                password: loginData.password,
            };

            const response = await authenticateClient.authenticate(authenticateData);

            if (response.access_token) {
                sessionStorage.setItem('token', response.access_token)
                setCookie('authToken', response.access_token, 5 * 1000);
                console.log('Autenticação bem-sucedida:', response);
                navigate('/Home');
            } else {
                setError('Token de acesso ausente na resposta.');
                console.error('Token de acesso ausente na resposta.');
            }
        } catch (error) {
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
                    <div className={styles.secondColum} >
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
                        <button className={styles.butt2} onClick={handleSubmit} onKeyPress={handleSubmit}>ENTRAR</button>
                    </div>
                </div>
            </div>
        </section>
    );
};
