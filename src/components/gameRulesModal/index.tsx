// RuleListModal.tsx
import React, { useEffect, useState } from 'react';
import { RpgGameRulesClient } from '../../client/rpgGameRules.client';
import { GameRules } from '../../models/gameRules';
import styles from './index.module.css';
import Modal from 'react-modal';
import { BsXLg } from "react-icons/bs";

interface RuleListModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const RuleListModal: React.FC<RuleListModalProps> = ({ isOpen, onRequestClose }) => {
  const [rules, setRules] = useState<GameRules[]>([]);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await new RpgGameRulesClient().findAll();
        setRules(response);
      } catch (error) {
        console.error('Erro ao carregar as regras:', error);
      }
    };

    fetchRules();
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      className={styles.modal}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Criar Regra Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
        content: {
          maxWidth: "50%",
          backgroundColor: "#000",
          color: "#fff",
          border: "1px solid #333",
          background: "transparent",
        },
      }}>
    <div className={styles.formContainer}>
      
      <ul className={styles.formModal}>
      <h2 className={styles.subTitle}>Lista de regras</h2>
        {rules.map((rule) => (
          <li key={rule.id} className={styles.containerInput}>
            <strong>{rule.name}</strong>
            <p>{rule.description}</p>
          </li>
        ))}
      </ul>
      <BsXLg className={styles.exitModal} onClick={onRequestClose} />
    </div>
    </Modal>
  );
};

export default RuleListModal;
