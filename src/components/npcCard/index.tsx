import React from 'react';
import styles from './styles.module.css';

interface NpcCardProps {
    id: string;
    name: string;
    race: string;
    group: string;
    level: number;
    imageUrl: string;
}

const NpcCard: React.FC<NpcCardProps> = ({ id, name, race, group, level, imageUrl }) => {
    return (
        <div className={styles.card} key={id}>
            <img className={styles.img} src={imageUrl} alt={`Imagem do RPG ${name}`} />
            <div className={styles.containerInfo}>
                <div className={styles.cardInfo}>
                    <p>Nome: {name}</p>
                    <p>Raça: {race}</p>
                    <p>Classe: {group}</p>
                    <p>Nível: {level}</p>
                </div>
                <div className={styles.cardInfo}>
                    <button className={styles.buttonInfo}>Visualizar</button>
                </div>
            </div>
        </div>
    );
};

export default NpcCard;
