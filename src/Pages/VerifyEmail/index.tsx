import { useState } from 'react';
import styles from './styles.module.css';

export const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);

    const handleVerificationSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Código a ser verificado:', verificationCode);
        setIsCodeSent(true);
    };

    const handleResendCode = () => {
        console.log('Código reenviado.');
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.card}>
                <h2 className={styles.heading}>Confirmação de Email</h2>
                {!isCodeSent ? (
                    <>
                        <p className={styles.subtext}>
                            Insira o código de verificação de 4 dígitos enviado para o seu email.
                        </p>
                        <form className={styles.form} onSubmit={handleVerificationSubmit}>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                maxLength={4}
                                placeholder="Código de 4 dígitos"
                                className={styles.input}
                                required
                            />
                            <button type="submit" className={styles.button}>Verificar</button>
                        </form>
                        <p className={styles.resend} onClick={handleResendCode}>Enviar código novamente</p>
                    </>
                ) : (
                    <p className={styles.successText}>Código verificado com sucesso!</p>
                )}
            </div>
        </div>
    );
};
