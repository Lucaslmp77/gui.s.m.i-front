import React, { useEffect, useState } from 'react';
import { RpgGameClient } from '../../client/rpg-game.client';
import { jwtDecode } from 'jwt-decode';
import { Decoded } from '../../models/decoded';
import RpgCard from '../../components/rpgCard';
import FundoRPG from '../../assets/FundoRPG.png';
import AnythingImg from '../../assets/Anything.png';
import styles from './styles.module.css';
import { RpgGame } from '../../models/rpg-game';
import Header from '../../components/header';

export const Home: React.FC = () => {
    const authToken = sessionStorage.getItem('token');
    let decoded: Decoded = {} as Decoded;

    if (authToken) {
        decoded = jwtDecode(authToken) as Decoded;
    }

    const userName = decoded.name;
    const userId = decoded.sub;
    let pageSize = 0
    const [rpgGames, setRpgGames] = useState<RpgGame[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRpgs, setTotalRpgs] = useState(0);

    useEffect(() => {
        const fetchRpgGames = async (page: number) => {
            try {
                const client = new RpgGameClient();
                const rpgs = await client.findRpgByUser(userId, page);
                const requestTotalRpgs = await client.countRpgGameByUser(userId);
                setTotalRpgs(requestTotalRpgs);
                setRpgGames(rpgs);
                pageSize = rpgGames.length
            } catch (error) {
                console.error('Erro ao buscar os RPGs:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchRpgGames(currentPage);
        }
    }, [userId, currentPage]);

    const rpgsPerPage = 4;

    const handleNextPage = () => {
        const totalPages = Math.ceil(totalRpgs / rpgsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <section>
            <Header userName={userName} />
            <div className={styles.container}>
                <div className={styles.cardContainer}>
                    {loading ? (
                        <p>Carregando...</p>
                    ) : rpgGames.length > 0 ? (
                        <div>
                            <div className={styles.cardContainer}>
                                {rpgGames.map((rpg) => (
                                    <div key={rpg.id}>
                                        <RpgCard
                                            id={rpg.id}
                                            name={rpg.name}
                                            master={rpg.user?.name}
                                            description={rpg.description}
                                            imageUrl={FundoRPG}
                                            rpgGameId={rpg.id}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className={styles.pagination}>
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={currentPage === 1 ? styles.disabled : ''}
                                >
                                    Anterior
                                </button>
                                <span>Página {currentPage}</span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage * rpgsPerPage >= totalRpgs}
                                    className={currentPage * rpgsPerPage >= totalRpgs ? styles.disabled : ''}
                                >
                                    Próximo
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.containerAnythingImg}>
                            <img className={styles.anythingImg} src={AnythingImg} alt="wizard dog" />
                            <h2>Você não tem nenhuma mesa!</h2>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
