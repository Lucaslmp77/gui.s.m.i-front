// AddRuleModal.tsx
import React, { useState } from 'react';
import { RpgGameRulesClient } from '../../client/rpgGameRules.client';
import { GameRules } from '../../models/gameRules'; 

interface AddRuleModalProps {
  onClose: () => void;
}

const AddRuleModal: React.FC<AddRuleModalProps> = ({ onClose }) => {
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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewRule((prevRule) => ({ ...prevRule, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await new RpgGameRulesClient().save(newRule);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar nova regra:', error);
    }
  };

  return (
    <div>
      <h2>Adicionar Nova Regra</h2>
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
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddRuleModal;
