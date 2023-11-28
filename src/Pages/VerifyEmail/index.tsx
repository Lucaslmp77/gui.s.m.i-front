import { useState } from 'react';
import styles from './styles.module.css';
import { NavLink, useParams } from 'react-router-dom';
import { OtpClient } from '../../client/otp.client';
import { hash } from 'bcryptjs';

export const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState(Array(4).fill(''));
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null);

    const { email } = useParams();

    const handleVerificationSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const otp = verificationCode.join('');

        try {
            if (email) {
                const emailDecoded = atob(email);
                console.log(email);
                console.log(otp, otp.length);

                const body: { email: string, otp: string } = { email: '', otp: '' };

                body.email = emailDecoded;
                body.otp = otp;

                const otpClient = new OtpClient();
                const result = await otpClient.verifyUserEmail(body);
                console.log(result);
            } else {
                console.error(email);
            }
        } catch (error) {
            console.error('Erro ao verificar código:', error);
        }
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
                        <div className={styles.subtext}>
                            <p>Insira o código de verificação de 4 dígitos enviado para o seu email.</p>
                            <p className={styles.resend} onClick={handleResendCode}>Enviar código novamente</p>
                        </div>
                        <form className={styles.form}>
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
                        <button type="submit" onClick={handleVerificationSubmit} className={styles.button}>Verificar</button>
                        <NavLink to={`/register`}>
                            <button className={styles.backButton} onClick={handleBack}>Voltar</button>
                        </NavLink>
                    </div>
                ) : (
                    <p className={styles.successText}>
                        {verificationResult === 'success' ? 'Código verificado com sucesso!' : 'Falha na verificação do código.'}
                    </p>
                )}
            </div>
        </div>
    );
};
