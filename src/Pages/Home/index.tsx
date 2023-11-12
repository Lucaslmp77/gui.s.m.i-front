import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { jwtDecode } from "jwt-decode";
import { Decoded } from '../../models/decoded';

export const Home = () => {
    const userName = "Seu Nome de Usuário";

    function getCookie(name: string) {
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
          let cookie = cookieArray[i].trim();
          if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring(name.length + 1);
          }
        }
        return null;
      }

      const authToken = getCookie('authToken');

      let decoded = Decoded;

      if (authToken) {
        decoded = jwtDecode(authToken);
      }

      console.log(decoded.name);

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
