import React, { useState } from 'react';
import Modal from 'react-modal';
import { RpgGameClient } from '../../client/rpg-game.client.ts';
import styles from './styles.module.css';

interface CreateTableModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const ModalTable: React.FC<CreateTableModalProps> = ({ isOpen, onRequestClose }) => {
    const [errorMessage, setErrorMessage] = useState(false);
    const rpgGameClient = new RpgGameClient();
    const [rpgGame, setRpgGame] = useState({ name: '', description: '' });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRpgGame({ ...rpgGame, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await rpgGameClient.save(rpgGame);
            setErrorMessage(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Criar Mesa Modal"
        >
            <div className={styles.formContainer}>
                <h2>Criar Mesa</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="tableName">Nome da Mesa:</label>
                    <input
                        type="text"
                        id="tableName"
                        name="name"
                        value={rpgGame.name}
                        onChange={handleChange}
                    />

                    <label htmlFor="tableDescription">Descrição:</label>
                    <textarea
                        id="tableDescription"
                        name="description"
                        value={rpgGame.description}
                        onChange={handleChange}
                    />

                    <button type="submit">Criar Mesa</button>
                </form>
                <button onClick={onRequestClose}>Fechar Modal</button>
                <p key={1}>{errorMessage && <p style={{ color: 'green' }}>Sala criada com sucesso</p>}</p>
            </div>
        </Modal>
    );
};

export default ModalTable;
