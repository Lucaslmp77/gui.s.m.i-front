// RuleListModal.tsx
import React, { useEffect, useState } from 'react';
import { RpgGameRulesClient } from '../../client/rpgGameRules.client';
import { GameRules } from '../../models/gameRules';

interface RuleListModalProps {
  onClose: () => void;
}

const RuleListModal: React.FC<RuleListModalProps> = ({ onClose }) => {
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

  return (
    <div>
      <h2>Lista de regras</h2>
      <ul>
        {rules.map((rule) => (
          <li key={rule.id}>{rule.name}</li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default RuleListModal;
