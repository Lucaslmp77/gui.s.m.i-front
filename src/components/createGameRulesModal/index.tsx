// AddRuleModal.tsx
import React, { useState, useRef, useEffect } from 'react';
import { RpgGameRulesClient } from '../../client/rpgGameRules.client';
import styles from "./index.module.css";
import Modal from 'react-modal';
import { BsXLg } from "react-icons/bs";
import { useParams } from 'react-router-dom';

interface AddRuleModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const AddRuleModal: React.FC<AddRuleModalProps> = ({ isOpen, onRequestClose }) => {
  const rulesClient = new RpgGameRulesClient();
  const { id } = useParams<{ id?: string }>() ?? { id: '' };
  const [formData, setFormData] = useState<any>({
    id: "",
    name: "",
    description: "",
    rpgGameId: "",
    rpgGame: {
      id: "",
      name: "",
      description: "",
      user: {
        name: "",
        email: "",
        password: "",
      },
      userId: "",
    },
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  const findById = async () => {
    if (id) {
        try {
          const response = await (RpgGameRulesClient as any).findUnique(id);
            setFormData({ name: response.name, description: response.description, rpgGameId: response.id });
        } catch (error) {
            console.log(error);
        }
    }
};

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
  
    let rules: {
      name: string;
      description: string;
      rpgGameId: string;
    } = {
      name: "",
      description: "",
      rpgGameId: id !== undefined ? id : "",
    };
  
    rules.name = formData.name;
    rules.description = formData.description;
  
    try {
      const isFormValid = await validateForm();
  
      if (isFormValid) {
        
  
        await rulesClient.save(rules);
        setSuccessMessage("Regra cadastrada com sucesso");
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
      console.error("Erro ao cadastrar regra:", error);
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

  if (!isOpen) {
    return null;
  }

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
      }}>
      <div className={styles.formContainer}>
        <form className={styles.formModal} onSubmit={handleSubmit}>
          {successMessage && (
            <div className={styles.successMessage}>{successMessage}</div>
          )}
          <h2 className={styles.subTitle}>CRIAR REGRA</h2>
          <div className={styles.containerInput}>
            <label htmlFor="tableName">Nome da regra</label>
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
          <button type="submit">Criar Regra</button>
        </form>
        <BsXLg className={styles.exitModal} onClick={onRequestClose} />
      </div>
    </Modal>
  );
};

export default AddRuleModal;
