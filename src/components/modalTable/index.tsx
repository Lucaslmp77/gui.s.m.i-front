import React, { useState } from 'react';
import Modal from 'react-modal';
import { RpgGameClient } from '../../client/rpg-game.client.ts';
import styles from './styles.module.css';
import { BsXLg } from "react-icons/bs";

interface CreateTableModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const ModalTable: React.FC<CreateTableModalProps> = ({ isOpen, onRequestClose }) => {
    const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});
    const rpgGameClient = new RpgGameClient();
    const [rpgGame, setRpgGame] = useState({ name: '', description: '' });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRpgGame({ ...rpgGame, [event.target.name]: event.target.value });
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.target.name === 'name') {
            if (!event.target.value.trim() || event.target.value.length > 25) {
                setErrorMessages({ ...errorMessages, name: 'O nome da mesa deve ter entre 1 e 25 caracteres.' });
            } else {
                setErrorMessages({ ...errorMessages, name: '' });
            }
        } else if (event.target.name === 'description') {
            if (event.target.value.length > 300) {
                setErrorMessages({ ...errorMessages, description: 'A descrição da mesa não pode ter mais de 300 caracteres.' });
            } else {
                setErrorMessages({ ...errorMessages, description: '' });
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Clear previous error messages
        setErrorMessages({});

        // Validar campos no submit
        if (!rpgGame.name.trim() || rpgGame.name.length > 25) {
            setErrorMessages({ ...errorMessages, name: 'O nome da mesa deve ter entre 1 e 25 caracteres.' });
            return;
        }

        if (rpgGame.description.length > 300) {
            setErrorMessages({ ...errorMessages, description: 'A descrição da mesa não pode ter mais de 300 caracteres.' });
            return;
        }

        try {
            await rpgGameClient.save(rpgGame);
            setErrorMessages({ ...errorMessages, common: 'Sala criada com sucesso' });
        } catch (error) {
            console.log(error);
            setErrorMessages({ ...errorMessages, common: 'Erro ao criar a sala. Por favor, tente novamente.' });
        }
    };


    return (
        <Modal
            className={styles.modal}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Criar Mesa Modal"
        >
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="tableName">Nome da Mesa</label>
                    <input
                        type="text"
                        id="tableName"
                        name="name"
                        value={rpgGame.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errorMessages.name && <p style={{ color: 'red' }}>{errorMessages.name}</p>}

                    <label htmlFor="tableDescription">Descrição</label>
                    <textarea
                        id="tableDescription"
                        name="description"
                        value={rpgGame.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errorMessages.description && <p style={{ color: 'red' }}>{errorMessages.description}</p>}

                    {errorMessages.common && <p style={{ color: 'red' }}>{errorMessages.common}</p>}

                    <button type="submit">Criar Mesa</button>
                </form>
                <BsXLg className={styles.exitModal} onClick={onRequestClose} />
            </div>
        </Modal>
    );
};

export default ModalTable;
