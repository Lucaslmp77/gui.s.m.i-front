import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { RpgGameClient } from '../../client/rpg-game.client';
import { jwtDecode } from 'jwt-decode';
import { Decoded } from '../../models/decoded';
import { RpgGame } from '../../models/rpg-game';
import FundoRPG from '../../assets/FundoRPG.png';

export const Home = () => {
    const authToken = sessionStorage.getItem('token');
    let decoded: Decoded = {} as Decoded;

    if (authToken) {
        decoded = jwtDecode(authToken) as Decoded;
    }

    const userName = decoded.name;
    const userId = decoded.sub;

    const [rpgGames, setRpgGames] = useState<RpgGame[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRpgGames = async () => {
            try {
                const client = new RpgGameClient();
                const rpgs = await client.findRpgByUser(userId);
                setRpgGames(rpgs);
            } catch (error) {
                console.error('Erro ao buscar os RPGs:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchRpgGames();
        }
    }, [userId]);

    return (
        <section>
            <div className={styles.header}>
                <div className={styles.userMenu}>
                    Bem-vindo, {userName}
                </div>
                <nav className={styles.navigation}>
                    <ul>
                        <li>
                            <NavLink to="/home-minhas-mesas" className={`${styles.link} ${window.location.pathname === '/home-minhas-mesas' ? styles.selected : ''}`}>
                                Minhas mesas
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/criar-mesa" className={styles.link}>
                                Criar mesa
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/procurar-mesas" className={styles.link}>
                                Procurar mesas
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={styles.container}>
                <div className={styles.cardContainer}>
                    {loading ? (
                        <p>Carregando...</p>
                    ) : rpgGames.length > 0 ? (
                        <div>
                            <div className={styles.cardContainer}>
                                {rpgGames.map((rpg: RpgGame) => (
                                    <div className={styles.card} key={rpg.id}>
                                        <div className={styles.imageContainer}>
                                            <img src={FundoRPG} alt="Imagem do RPG" />
                                        </div>
                                        <div className={styles.cardInfo}>
                                            <h3>Nome: {rpg.name}</h3>
                                            <h3>Descrição: {rpg.description}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>Nenhum RPG encontrado.</p>
                    )}
                </div>
            </div>
        </section>
    );
};
