import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { RpgGameClient } from '../../client/rpg-game.client';
import { jwtDecode } from 'jwt-decode';
import { Decoded } from '../../models/decoded';
import { RpgGame } from '../../models/rpg-game';

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
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.userMenu}>
                    Bem-vindo, {userName}
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
                        <li>
                            <NavLink to="/procurar-mesas" className={styles.link}>
                                Procurar mesas
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div>
                {loading ? (
                    <p>Carregando...</p>
                ) : rpgGames.length > 0 ? (
                    <div>
                        <h2>Seus RPGs:</h2>
                        <ul>
                            {rpgGames.map((rpg: RpgGame) => (
                                <li key={rpg.id}>{rpg.name}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Nenhum RPG encontrado.</p>
                )}
            </div>
        </div>
    );
};
