import { useState } from 'react';
import styles from './styles.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthenticateClient } from '../../client/authenticate.client';
import { Decoded } from "../../models/decoded.ts";
import { jwtDecode } from "jwt-decode";
import { UserClient } from '../../client/user.client.ts';

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

    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const authenticateClient = new AuthenticateClient();
        const userClient = new UserClient();
        const user = await userClient.findUserByEmail(loginData.email);

        try {
            const authenticateData = {
                email: loginData.email,
                password: loginData.password,
            };

            const response = await authenticateClient.authenticate(authenticateData);

            sessionStorage.setItem('username', authenticateData.email)
            if (response.access_token) {
                sessionStorage.setItem('token', response.access_token);
                console.log('Autenticação bem-sucedida:', response);
                navigate('/home-minhas-mesas');
            } else {
                setError('Token de acesso ausente na resposta.');
                console.error('Token de acesso ausente na resposta.');
            }
            const authToken = sessionStorage.getItem('token');
            let decoded: Decoded = {} as Decoded;

            if (authToken) {
                decoded = jwtDecode(authToken);
            }
            sessionStorage.setItem('name', decoded.name)
        } catch (error) {
            if (user.verified == false) {
                setError('Usuário não autenticado, verifique seu email ou faça o cadastro novamente.');
            } else {
                setError('Autenticação falhou. Por favor, verifique suas credenciais.');
                console.error('Erro de autenticação:', error);
            }
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
