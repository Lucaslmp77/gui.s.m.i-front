import { useState } from "react";
import styles from "./styles.module.css";
import { UserClient } from "../../client/user.client";
import { User } from "../../models/user";
import { NavLink } from "react-router-dom";

export const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: { target: { name: s; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const userClient = new UserClient();
            const user = new User();
            user.name = formData.name;
            user.email = formData.email;
            user.password = formData.password;
            const response = await userClient.save(user);
            console.log("Usuário cadastrado com sucesso:", response);
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
        }
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
                        />
                    </div>
                    <div className={styles.inputs}>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputs}>
                        <label>Senha</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button className={styles.butt} type="submit">Cadastre-se</button>
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
