import React, { useState, useEffect } from 'react';
import { RpgGameRulesClient } from '../../client/rpg-gameRules.client';
import { GameRules } from '../../models/gameRules';

interface RulesListModalProps {
  visible: boolean;
  onClose: () => void;
}

const RulesListModal: React.FC<RulesListModalProps> = ({ visible, onClose }) => {
  const [rules, setRules] = useState<GameRules[]>([]);

  useEffect(() => {
    const loadRules = async () => {
      try {
        const data = await RpgGameRulesClient.findAll(1);
        setRules(data);
      } catch (error) {
        console.error('Erro ao carregar as regras', error);
      }
    };

    if (visible) {
      loadRules();
    }
  }, [visible]);

  return (
    <div style={{ display: visible ? 'block' : 'none' }}>
      <div>
        <h2>Lista de Regras</h2>
        <ul>
          {rules.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
      <button onClick={onClose}>Fechar</button>
    </div>
  );
};

export default RulesListModal;
