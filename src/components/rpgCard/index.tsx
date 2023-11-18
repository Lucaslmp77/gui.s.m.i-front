import React from 'react';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';

interface RpgCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  master: string
  rpgGameId: string
}

const RpgCard: React.FC<RpgCardProps> = ({ id, name, description, imageUrl, master, rpgGameId }) => {
  return (
    <div className={styles.card} key={id}>
      <img src={imageUrl} alt={`Imagem do RPG ${name}`} />
      <div className={styles.containerInfo}>
        <div className={styles.cardInfo}>
          <p>Título: {name}</p>
          <p>Mestre: {master}</p>
          <p>Descrição: {description}</p>
        </div>
        <NavLink to={`/mesa/${rpgGameId}`} className={styles.link}>
          <button>Acessar mesa</button>
        </NavLink>
      </div>
    </div>
  );
};

export default RpgCard;
