import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './styles.module.css';
import { BsXLg } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import { Character } from '../../models/character.ts';
import { CharacterClient } from '../../client/character.client.ts';

import WizardImg from '../../assets/Mago.jpg';
import RangerImg from '../../assets/Patrulheiro.jpg';
import WarriorImg from '../../assets/Guerreiro.jpg';
import ClericImg from '../../assets/Clerigo.jpg';
import PaladinImg from '../../assets/Paladino.jpg';
import NpcCard from '../npcCard/index.tsx';

interface CreateTableModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const ListNpcsModal: React.FC<CreateTableModalProps> = ({ isOpen, onRequestClose }) => {

    const { id } = useParams();

    const [npcs, setNpcs] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNpcs, setTotalNpcs] = useState(0);

    useEffect(() => {
        const fetchCharacters = async (page: number) => {
            try {
                if (id) {
                    const client = new CharacterClient();
                    const filterCharactersNpc = await client.findCharacterNpcByRpgGame(id, page);
                    const requestTotalCharactersNpc = await client.countCharactersNpcByRpgGame(id);
                    setTotalNpcs(requestTotalCharactersNpc);
                    setNpcs(filterCharactersNpc);
                }
            } catch (error) {
                console.error('Erro ao buscar os NPCs:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCharacters(currentPage);
        }
    }, [id, currentPage]);

    const charactersPerPage = 10;

    const handleNextPage = () => {
        const totalPages = Math.ceil(totalNpcs / charactersPerPage);
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
        <Modal
            className={styles.modal}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="NPCs"
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                },
                content: {
                    maxWidth: "100%",
                    maxHeight: "100%",
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "1px solid #333",
                    background: "transparent",
                },
            }}
        >
            <div className={styles.container}>
                <div className={styles.cardContainer}>
                    {loading ? (
                        <p>Carregando...</p>
                    ) : npcs.length > 0 ? (
                        <div>
                            <div className={styles.cardContainer}>
                                {npcs.map((npc) => (
                                    <div key={npc.id}>
                                        <NpcCard
                                            id={npc.id}
                                            name={npc.name}
                                            group={npc.group}
                                            race={npc.race}
                                            level={npc.level}
                                            imageUrl={
                                                npc.group === "Mago"
                                                    ? WizardImg
                                                    : npc.group === "Arqueiro"
                                                        ? RangerImg
                                                        : npc.group === "Guerreiro"
                                                            ? WarriorImg
                                                            : npc.group === "Ladrão"
                                                                ? RangerImg
                                                                : npc.group === "Clérigo"
                                                                    ? ClericImg
                                                                    : npc.group === "Paladino"
                                                                        ? PaladinImg
                                                                        : npc.group === "Bruxo"
                                                                            ? RangerImg
                                                                            : npc.group === "Bárbaro"
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
                                    disabled={currentPage * charactersPerPage >= totalNpcs}
                                    className={currentPage * charactersPerPage >= totalNpcs ? styles.disabled : ''}
                                >
                                    Próximo
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>Essa mesa não possui nenhum NPC.</p>
                    )}
                </div>
                <BsXLg className={styles.exitModal} onClick={onRequestClose} />
            </div>
        </Modal>
    );
};

export default ListNpcsModal;
