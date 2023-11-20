// RuleListModal.tsx
import React, { useEffect, useState } from 'react';
import { RpgGameRulesClient } from '../../client/rpgGameRules.client';
import { GameRules } from '../../models/gameRules';
import styles from './index.module.css';
import Modal from 'react-modal';
import { BsXLg } from "react-icons/bs";
import EditRuleModal from '../editGameRulesModal';
import AddRuleModal from '../createGameRulesModal';

interface RuleListModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const RuleListModal: React.FC<RuleListModalProps> = ({ isOpen, onRequestClose }) => {
  const [isAddRuleModalOpen, setAddRuleModalOpen] = useState(false);
  const [rules, setRules] = useState<GameRules[]>([]);
  const [selectedRule, setSelectedRule] = useState<GameRules | null>(null);
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);

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

  const handleRuleClick = (rule: GameRules) => {
    if (!event || (event.target as HTMLElement).className !== styles.deleteRule) {
      setSelectedRule(rule);
      setSecondModalOpen(true);
    }
  };

  const handleDeleteRule = async (rule: GameRules) => {
    try {
      const isConfirmed = window.confirm(`Tem certeza que deseja deletar a regra "${rule.name}"?`);

      if (isConfirmed) {
        await new RpgGameRulesClient().delete(rule.id);

        const updatedRules = rules.filter((r) => r.id !== rule.id);
        setRules(updatedRules);

        setSecondModalOpen(false);
        setSelectedRule(null);
      }
    } catch (error) {
      console.error('Error deleting the rule:', error);
    }
  };

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
      }}
    >
      <div className={styles.formContainer}>
        <ul className={styles.formModal}>
          <h2 className={styles.subTitle}>Lista de regras</h2>
          {rules.map((rule) => (
            <li key={rule.id} className={styles.containerInput} onClick={() => handleRuleClick(rule)}>
              <strong>{rule.name}</strong>
              <span
                className={styles.deleteRule}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteRule(rule);
                }}
              >
                x
              </span>
              <p>{rule.description}</p>
            </li>
          ))}
          <button onClick={() => setAddRuleModalOpen(true)}>CRIAR REGRA</button>
        </ul>
        <BsXLg className={styles.exitModal} onClick={onRequestClose} />

        {isAddRuleModalOpen && (
          <AddRuleModal
            isOpen={isAddRuleModalOpen}
            onRequestClose={() => setAddRuleModalOpen(false)}
            initialFormData={null}
          />
        )}

        {isSecondModalOpen && (
          <EditRuleModal
            isOpen={isSecondModalOpen}
            onRequestClose={() => {
              setSecondModalOpen(false);
              setSelectedRule(null);
            }}
            initialFormData={selectedRule}
          />
        )}
      </div>
    </Modal>
  );
};

export default RuleListModal;