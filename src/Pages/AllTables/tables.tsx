import React, {useEffect, useState} from "react";
import {RpgGameClient} from "../../client/rpg-game.client.ts";
import {RpgGame} from "../../models/rpg-game.ts";
import styles from "../Home/styles.module.css";
import RpgCard from "../../components/card";
import FundoRPG from "../../assets/FundoRPG.png";
import { Decoded } from '../../models/decoded';
import { jwtDecode } from 'jwt-decode';
import {NavLink} from "react-router-dom";

export const Tables = () => {
    const [Rooms, setRooms] = useState<RpgGame[]>()
    let idRoom = ''
    const authToken = sessionStorage.getItem('token');
    let decoded: Decoded = {} as Decoded;

    if (authToken) {
        decoded = jwtDecode(authToken) as Decoded;
    }

    const userId = decoded.sub;

    const [rpgGames, setRpgGames] = useState<RpgGame[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        const fetchRpgGames = async (page: number) => {
            try {
                const client = new RpgGameClient();
                const rpgs = await client.findAll(page);
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

    const [mostrarTabela, setMostrarTabela] = useState(false); // estado para controlar a renderização da tabela

    const handleClick = (id: string) => {
        setMostrarTabela(true); // atualiza o estado para mostrar a tabela quando o botão é clicado
        idRoom = id
    };

    const handleNextPage = () => {
        // Verifica se há mais páginas antes de incrementar
        if (rpgGames.length === 8) {
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
                                            description={rpg.description}
                                            imageUrl={FundoRPG}
                                        />
                                        <NavLink to={`/mesa/${rpg.id}`} className={styles.link}>
                                            Acessar mesa
                                        </NavLink>
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
                                    disabled={rpgGames.length < 8}
                                    className={rpgGames.length < 8 ? styles.disabled : ''}
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