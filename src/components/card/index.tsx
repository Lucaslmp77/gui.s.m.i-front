import React from 'react';
import styles from './styles.module.css';

interface RpgCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const RpgCard: React.FC<RpgCardProps> = ({ id, name, description, imageUrl }) => {
  return (
    <div className={styles.card} key={id}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={`Imagem do RPG ${name}`} />
      </div>
      <div className={styles.cardInfo}>
        <p>Nome: {name}</p>
        <p>Descrição: {description}</p>
      </div>
    </div>
  );
};

export default RpgCard;
