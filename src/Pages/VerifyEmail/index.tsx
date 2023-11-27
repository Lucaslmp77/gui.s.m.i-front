import { useState } from 'react';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';

export const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState(Array(4).fill(''));
    const [isCodeSent, setIsCodeSent] = useState(false);

    const handleVerificationSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Código a ser verificado:', verificationCode.join(''));
        setIsCodeSent(true);
    };

    const handleResendCode = () => {
        console.log('Código reenviado.');
    };

    const handleBack = () => {
        console.log('Botão Voltar pressionado.');
    };

    const handleCodeInputChange = (index: number, value: string) => {
        const newCode = [...verificationCode];

        if (value === '' && index > 0) {
            const prevInputElement = document.getElementById(`code-input-${index - 1}`);
            if (prevInputElement) {
                prevInputElement.focus();
            }
        }

        newCode[index] = value;

        if (index < newCode.length - 1 && value !== '') {
            const nextInputElement = document.getElementById(`code-input-${index + 1}`);
            if (nextInputElement) {
                nextInputElement.focus();
            }
        }

        setVerificationCode(newCode);
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.card}>
                <h2 className={styles.heading}>Confirmação de Email</h2>
                {!isCodeSent ? (
                    <div>
                        <p className={styles.subtext}>
                            Insira o código de verificação de 4 dígitos enviado para o seu email.
                            <p className={styles.resend} onClick={handleResendCode}>Enviar código novamente</p>
                        </p>
                        <form className={styles.form} onSubmit={handleVerificationSubmit}>
                            {verificationCode.map((digit, index) => (
                                <input
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleCodeInputChange(index, e.target.value)}
                                    maxLength={1}
                                    id={`code-input-${index}`}
                                    key={index}
                                    className={styles.input}
                                    required
                                />
                            ))}
                        </form>
                        <button type="submit" className={styles.button}>Verificar</button>
                        <NavLink to={`/register`}>
                            <button className={styles.backButton} onClick={handleBack}>Voltar</button>
                        </NavLink>
                    </div>
                ) : (
                    <p className={styles.successText}>Código verificado com sucesso!</p>
                )}
            </div>
        </div>
    );
};
