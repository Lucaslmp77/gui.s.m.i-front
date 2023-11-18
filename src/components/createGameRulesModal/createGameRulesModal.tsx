import React, { useState } from 'react';
import { GameRules } from '../../models/gameRules';
import { RpgGameRulesClient } from '../../client/rpgGameRules.client';

interface CreateRuleModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (rule: GameRules) => void;
}

const CreateRuleModal: React.FC<CreateRuleModalProps> = ({ visible, onClose, onSave }) => {
    const [name, setName] = useState('');

    const handleSave = async () => {
        try {
            const data = await RpgGameRulesClient.save({ name });
            onSave(data);
            setName('');
            onClose();
        } catch (error) {
            console.error('Erro ao salvar a regra', error);
        }
    };

    return (
        <div style={{ display: visible ? 'block' : 'none' }}>
            <div>
                <h2>Criar Nova Regra</h2>
                <label>
                    Nome da Regra:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
            </div>
            <button onClick={onClose}>Cancelar</button>
            <button onClick={handleSave}>Salvar</button>
        </div>
    );
};

export default CreateRuleModal;
