// RuleListModal.tsx
import React, { useEffect, useState } from 'react';
import { RpgGameRulesClient } from '../../client/rpgGameRules.client';
import { GameRules } from '../../models/gameRules';
import styles from './index.module.css';

interface RuleListModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const RuleListModal: React.FC<RuleListModalProps> = ({ isOpen, onRequestClose }) => {
  const [rules, setRules] = useState<GameRules[]>([]);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await new RpgGameRulesClient().findAll(1);
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
    <div className={styles.modal_container}>
      <h2 className={styles.modal_header}>Lista de regras</h2>
      <ul className={styles.rule_list}>
        {rules.map((rule) => (
          <li key={rule.id} className={styles.rule_list_item}>{rule.name}</li>
        ))}
      </ul>
      <button className={styles.close_button} onClick={onRequestClose}>Fechar</button>
    </div>
  );
};

export default RuleListModal;
