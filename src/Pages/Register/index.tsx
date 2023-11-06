import { useState } from "react";
import styles from "./styles.module.css";
import { UserClient } from "../../client/user.client";
import { User } from "../../models/user";
import { NavLink } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isEmailUnique = async (email: string) => {
    const userClient = new UserClient();
    return await userClient.findUserByEmail(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    clearErrors(name);
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name" || name === "password" || name === "email") {
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
      } else {
        const isEmailNotUniqueResult = await isEmailUnique(value);
        if (isEmailNotUniqueResult) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email já está em uso",
          }));
          isValid = false;
        }
      }
    }

    return isValid;
  };

  const isValidEmailFormat = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isFormValid = await validateForm();

      if (isFormValid) {
        const userClient = new UserClient();
        const user = new User();

        user.name = formData.name;
        user.email = formData.email;
        user.password = formData.password;

        await userClient.save(user);
        console.log("Usuário cadastrado com sucesso:", user);
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  const validateForm = async () => {
    let isValid = true;
    const fieldNames = ["name", "email", "password"];

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
          <button className={styles.butt} type="submit">
            Cadastre-se
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
