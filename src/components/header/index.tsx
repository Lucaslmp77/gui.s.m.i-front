import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

interface HeaderProps {
    userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
    return (
        <header className={styles.header}>
            <div className={styles.userMenu}>Bem-vindo, {userName}</div>
            <nav className={styles.navigation}>
                <ul>
                    <li>
                        <NavLink
                            to="/home-minhas-mesas"
                            className={`${styles.link} ${window.location.pathname === '/home-minhas-mesas' ? styles.selected : ''}`}
                        >
                            Minhas mesas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/criar-mesa"
                        className={`${styles.link} ${window.location.pathname === '/criar-mesa' ? styles.selected : ''}`}
                        >
                            Criar mesa
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/procurar-mesas"
                        className={`${styles.link} ${window.location.pathname === '/procurar-mesas' ? styles.selected : ''}`}
                        >
                            Procurar mesas
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
