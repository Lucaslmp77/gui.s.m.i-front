import { useEffect, useState } from "react";
import { RpgGameClient } from "../../client/rpg-game.client.ts";
import { RpgGame } from "../../models/rpg-game.ts";
import styles from "../Home/styles.module.css";
import RpgCard from "../../components/rpgCard/index.tsx";
import FundoRPG from "../../assets/FundoRPG.png";
import { Decoded } from '../../models/decoded.ts';
import { jwtDecode } from 'jwt-decode';
import Header from "../../components/header/index.tsx";

export const Tables = () => {
    const authToken = sessionStorage.getItem('token');
    let decoded: Decoded = {} as Decoded;

    if (authToken) {
        decoded = jwtDecode(authToken) as Decoded;
    }

    const userId = decoded.sub;
    const userName = decoded.name;

    const [rpgGames, setRpgGames] = useState<RpgGame[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRpgs, setTotalRpgs] = useState(0);

    useEffect(() => {
        const fetchRpgGames = async (page: number) => {
            try {
                const client = new RpgGameClient();
                const rpgs = await client.findAll(page);
                const requestTotalRpgs = await client.countAllRpgGame();
                setTotalRpgs(requestTotalRpgs);
                setRpgGames(rpgs);
            } catch (error) {
                console.error('Erro ao buscar os RPGs:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchRpgGames(currentPage);
        }
    }, [currentPage]);

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
                        <p>Nenhum RPG encontrado.</p>
                    )}
                </div>
            </div>
        </section>
    )
}