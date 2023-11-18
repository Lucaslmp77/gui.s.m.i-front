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

    useEffect(() => {
        const fetchCharacters = async (page: number) => {
            try {
                const client = new CharacterClient();
                const filterCharacter = await client.findCharacterByUser(userId, page);
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

    const handleNextPage = () => {
        if (characters.length === 5) {
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
                                                                        : character.group === "Mago Negro"
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
                                    disabled={characters.length < 5}
                                    className={characters.length < 5 ? styles.disabled : ''}
                                >
                                    Próximo
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>Nenhuma ficha encontrada.</p>
                    )}
                </div>
            </div>
        </section>
    );
};
