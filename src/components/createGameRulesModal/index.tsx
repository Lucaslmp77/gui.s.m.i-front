// AddRuleModal.tsx
import React, { useState, useRef, useEffect } from 'react';
import { RpgGameRulesClient } from '../../client/rpgGameRules.client';
import { GameRules } from '../../models/gameRules';
import styles from "./index.module.css";

interface AddRuleModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const AddRuleModal: React.FC<AddRuleModalProps> = ({ isOpen, onRequestClose }) => {
  const [newRule, setNewRule] = useState<GameRules>({
    id: '',
    name: '',
    description: '',
    rpgGameId: '',
    rpgGame: {
      id: '',
      name: '',
      description: '',
      user: {
        name: '',
        email: '',
        password: '',
      },
      userId: '',
    },
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onRequestClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onRequestClose]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewRule((prevRule) => ({ ...prevRule, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await new RpgGameRulesClient().save(newRule);
      onRequestClose();
    } catch (error) {
      console.error('Erro ao salvar nova regra:', error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div ref={modalRef} className={styles.modal_container}>
      <h2>Adicionar Nova Regra</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newRule.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={newRule.description}
            onChange={handleInputChange}
          />
        </label>
        <div className={styles.button_container}>
          <button type="button" onClick={onRequestClose}>
            Cancel
          </button>
          <button type="button" onClick={handleSave}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddRuleModal;
