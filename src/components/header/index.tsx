import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import CreateTableModal from '../createTableModal';

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          <NavLink
              to="/home-minhas-mesas"
              className={`${styles.link} ${window.location.pathname === '/home-minhas-mesas' ? styles.selected : ''}`}
            >
              </NavLink>
            <a onClick={openModal} className={styles.link}>
              Criar mesa
            </a>
          </li>
          <li>
            <NavLink
              to="/procurar-mesas"
              className={`${styles.link} ${window.location.pathname === '/procurar-mesas' ? styles.selected : ''}`}
            >
              Procurar mesas
            </NavLink>
          </li>
        </ul>
      </nav>
      <CreateTableModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </header>
  );
};

export default Header;
