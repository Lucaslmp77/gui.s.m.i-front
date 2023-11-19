import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Decoded } from '../../models/decoded';
import styles from './styles.module.css';
import Header from '../../components/header';
import { Character } from '../../models/character';
import { CharacterClient } from '../../client/character.client';
import CharacterCard from '../../components/characterCard';

import WizardImg from '../../assets/Mago.jpg';
import RangerImg from '../../assets/Patrulheiro.jpg';
import WarriorImg from '../../assets/Guerreiro.jpg';
import ClericImg from '../../assets/Clerigo.jpg';
import PaladinImg from '../../assets/Paladino.jpg';
import AnythingImg from '../../assets/Anything.png';


export const MyCharacters: React.FC = () => {
    const authToken = sessionStorage.getItem('token');

    let decoded: Decoded = {} as Decoded;

    if (authToken) {
        decoded = jwtDecode(authToken) as Decoded;
    }

    const userName = decoded.name;
    const userId = decoded.sub;

    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCharacters, setTotalCharacters] = useState(0);

    useEffect(() => {
        console.log(totalCharacters);
    }, [totalCharacters]);

    useEffect(() => {
        const fetchCharacters = async (page: number) => {
            try {
                const client = new CharacterClient();
                const filterCharacter = await client.findCharacterByUser(userId, page);
                const requestTotalCharacters = await client.countCharactersByUser(userId);
                setTotalCharacters(requestTotalCharacters);
                setCharacters(filterCharacter);
            } catch (error) {
                console.error('Erro ao buscar as fichas:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchCharacters(currentPage);
        }
    }, [userId, currentPage]);

    const charactersPerPage = 5;

    const handleNextPage = () => {
        const totalPages = Math.ceil(totalCharacters / charactersPerPage);
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
                    ) : characters.length > 0 ? (
                        <div>
                            <div className={styles.cardContainer}>
                                {characters.map((character) => (
                                    <div key={character.id}>
                                        <CharacterCard
                                            id={character.id}
                                            name={character.name}
                                            group={character.group}
                                            race={character.race}
                                            level={character.level}
                                            imageUrl={
                                                character.group === "Mago"
                                                    ? WizardImg
                                                    : character.group === "Arqueiro"
                                                        ? RangerImg
                                                        : character.group === "Guerreiro"
                                                            ? WarriorImg
                                                            : character.group === "Ladrão"
                                                                ? RangerImg
                                                                : character.group === "Clérigo"
                                                                    ? ClericImg
                                                                    : character.group === "Paladino"
                                                                        ? PaladinImg
                                                                        : character.group === "Bruxo"
                                                                            ? RangerImg
                                                                            : character.group === "Bárbaro"
                                                                                ? RangerImg
                                                                                : RangerImg
                                            }
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
                                    disabled={currentPage * charactersPerPage >= totalCharacters}
                                    className={currentPage * charactersPerPage >= totalCharacters ? styles.disabled : ''}
                                >
                                    Próximo
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.containerAnythingImg}>
                            <img className={styles.anythingImg} src={AnythingImg} alt="wizard dog" />
                            <h2>Você não tem nenhuma ficha!</h2>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
