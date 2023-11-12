import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { jwtDecode } from "jwt-decode";
import { Decoded } from '../../models/decoded';

export const Home = () => {
    const authToken = sessionStorage.getItem('token');
    let decoded = Decoded;

    if (authToken) {
        decoded = jwtDecode(authToken);
    }

    const userName = decoded.name;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.userMenu}>
                    Bem-vindo, {userName}
                    {/* Adicione um ícone de usuário ou avatar aqui, se desejar */}
                </div>
                <nav className={styles.navigation}>
                    <ul>
                        <li>
                            <NavLink to="/minhas-mesas" className={styles.link}>
                                Minhas Mesas
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/criar-mesa" className={styles.link}>
                                Criar Mesa
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
