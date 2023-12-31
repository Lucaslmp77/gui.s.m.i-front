import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { RpgGameClient } from '../../client/rpg-game.client.ts';
import styles from './styles.module.css';
import { BsXLg } from "react-icons/bs";
import { RpgGameData } from '../../models/rpg-game-data.ts';

interface CreateTableModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const CreateTableModal: React.FC<CreateTableModalProps> = ({ isOpen, onRequestClose }) => {
    const [formData, setFormData] = useState<any>({
        name: "",
        description: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        description: "",
    });

    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const clearErrors = (field: string) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: "",
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        clearErrors(name);
    };

    const handleBlur = async (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "name" || name === "description") {
            const isValid = await validateField(name, value);
            if (!isValid) {
                e.preventDefault();
            }
        }
    };

    const validateField = async (name: string, value: string) => {
        let isValid = true;

        if (name === "name") {
            if (value.length === 0) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    name: "Nome da mesa é obrigatório",
                }));
                isValid = false;
            } else if (value.length < 3 || value.length > 25) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    name: "Nome da mesa deve ter entre 3 e 25 caracteres",
                }));
                isValid = false;
            }
        }

        if (name === "description") {
            if (value.length === 0) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    description: "Descrição da mesa é obrigatória",
                }));
                isValid = false;
            } else if (value.length < 5 || value.length > 90) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    description: "Descrição deve ter entre 5 e 90 caracteres",
                }));
                isValid = false;
            }
        }

        return isValid;
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const isFormValid = await validateForm();

            if (isFormValid) {
                const rpgClient = new RpgGameClient();
                const rpg = new RpgGameData();

                rpg.name = formData.name;
                rpg.description = formData.description;

                await rpgClient.save(rpg);
                setSuccessMessage("Mesa cadastrada com sucesso");
                setFormData({ name: "", description: "" });

                setTimeout(() => {
                    setSuccessMessage(null);
                    window.location.reload();
                }, 1000);

                setTimeout(() => {
                    setSuccessMessage(null);
                }, 1000);
            }
        } catch (error) {
            console.error("Erro ao cadastrar mesa:", error);
        }
    };

    const validateForm = async () => {
        let isValid = true;
        const fieldNames = ["name", "description"];

        for (const name of fieldNames) {
            isValid = await validateField(name, formData[name]) && isValid;
        }

        return isValid;
    };

    useEffect(() => {
        if (!isOpen) {
            setFormData({ name: "", description: "" });
            setErrors({ name: "", description: "" });
        }
    }, [isOpen]);


    return (
        <Modal
            className={styles.modal}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Criar Mesa Modal"
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
                <form className={styles.formModal} onSubmit={handleSubmit}>
                    {successMessage && (
                        <div className={styles.successMessage}>{successMessage}</div>
                    )}
                     <h2 className={styles.subTitle}>CRIAR MESA</h2>
                    <div className={styles.containerInput}>
                        <label htmlFor="tableName">Nome da mesa</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        {errors.name && <div className={styles.error}>{errors.name}</div>}
                    </div>

                    <div className={styles.containerInput}>
                        <label htmlFor="tableDescription">Descrição</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        {errors.description && <div className={styles.error}>{errors.description}</div>}
                    </div>
                    <button type="submit">Criar Mesa</button>
                </form>
                <BsXLg className={styles.exitModal} onClick={onRequestClose} />
            </div>
        </Modal>
    );
};

export default CreateTableModal;
