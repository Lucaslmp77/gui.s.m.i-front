import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";
import { UserClient } from "../../client/user.client";
import { User } from "../../models/user";

export const Register = () => {
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isEmailUnique = async (email: string) => {
    const userClient = new UserClient();
    return await userClient.findUserByEmail(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    clearErrors(name);

    if (name === "password" && formData.confirmPassword) {
      validateField("confirmPassword", formData.confirmPassword);
    }
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name" || name === "password" || name === "email" || name === "confirmPassword") {
      const isValid = await validateField(name, value);
      if (!isValid) {
        e.preventDefault();
      }
    }
  };

  const clearErrors = (field: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const validateField = async (name: string, value: string) => {
    let isValid = true;

    if (name === "name") {
      if (value.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "Nome de usuário é obrigatório",
        }));
        isValid = false;
      } else if (value.length < 3 || value.length > 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "Nome de usuário deve ter entre 3 e 10 caracteres",
        }));
        isValid = false;
      }
    }

    if (name === "password") {
      if (value.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Senha é obrigatória",
        }));
        isValid = false;
      } else if (value.length < 5 || value.length > 8) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Senha deve ter entre 5 e 8 caracteres",
        }));
        isValid = false;
      }
    }

    if (name === "confirmPassword") {
      if (value.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Confirmação de senha é obrigatória",
        }));
        isValid = false;
      } else if (value !== formData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "As senhas não coincidem",
        }));
        isValid = false;
      }
    }

    if (name === "email") {
      if (value.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email é obrigatório",
        }));
        isValid = false;
      } else if (!isValidEmailFormat(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email no formato inválido",
        }));
        isValid = false;
      } else if (await isEmailUnique(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Este email já existe",
        }));
      }
    }

    return isValid;
  };

  const isValidEmailFormat = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isFormValid = await validateForm();

      if (isFormValid) {
        setLoading(true);
        const userClient = new UserClient();
        const user = new User();

        user.name = formData.name;
        user.email = formData.email;
        user.password = formData.password;

        await userClient.save(user);
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        navigate(`/email-verification/verify/${btoa(user.email)}`);
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  };

  const validateForm = async () => {
    let isValid = true;
    const fieldNames = ["name", "email", "password", "confirmPassword"];

    for (const name of fieldNames) {
      isValid = await validateField(name, formData[name]) && isValid;
    }

    return isValid;
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Crie Sua Conta</h2>
          {successMessage && (
            <div className={styles.successMessage}>{successMessage}</div>
          )}
          <div className={styles.inputs}>
            <label>Username</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && <div className={styles.error}>{errors.name}</div>}
          </div>
          <div className={styles.inputs}>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <div className={styles.error}>{errors.email}</div>}
          </div>
          <div className={styles.inputs}>
            <label>Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && <div className={styles.error}>{errors.password}</div>}
          </div>
          <div className={styles.inputs}>
            <label>Confirme a Senha</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}
          </div>
          <button className={styles.butt} type="submit" disabled={loading}>
            {loading ? "Carregando..." : "Cadastre-se"}
          </button>
        </form>
        <footer className={styles.footer}>
          <p className={styles.text}>Já possui uma conta?</p>
          <NavLink to={`/`}>
            <button className={styles.butt}>Entrar</button>
          </NavLink>
        </footer>
      </div>
    </section>
  );
};
