import React from 'react';
import styles from './styles.module.css';

interface CharacterCardProps {
    id: string;
    name: string;
    race: string;
    group: string;
    level: number;
    imageUrl: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ id, name, race, group, level, imageUrl }) => {
    return (
        <div className={styles.card} key={id}>
            <img src={imageUrl} alt={`Imagem do RPG ${name}`} />
            <div className={styles.containerInfo}>
                <div className={styles.cardInfo}>
                    <p>Nome: {name}</p>
                    <p>Raça: {race}</p>
                    <p>Grupo: {group}</p>
                    <p>Nível: {level}</p>
                </div>
            </div>
        </div>
    );
};

export default CharacterCard;
