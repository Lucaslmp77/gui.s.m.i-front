import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { NavLink, useParams } from 'react-router-dom';
import { OtpClient } from '../../client/otp.client';

export const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState(Array(4).fill(''));
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [verificationResult, setVerificationResult] = useState<string | null>(null);
    const [resendSuccess, setResendSuccess] = useState<boolean>(false);
    const [isResendingCode, setIsResendingCode] = useState<boolean>(false);

    const { email } = useParams();

    const handleVerificationSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const otp = verificationCode.join('');

        if (email) {
            const emailDecoded = atob(email);

            const body: { email: string, otp: string } = { email: '', otp: '' };

            body.email = emailDecoded;
            body.otp = otp;

            const otpClient = new OtpClient();

            try {
                await otpClient.verifyUserEmail(body);
                setVerificationResult('success');
            } catch (error: any) {
                if (typeof error === 'string') {
                    setVerificationResult(error);
                } else if (error.response && error.response.data) {
                    setVerificationResult(error.response.data);
                } else {
                    setVerificationResult('Código inválido!');
                }
            }
        } else {
            console.log(email);
        }
    };

    const handleResendCode = async () => {
        const otpClient = new OtpClient();

        if (email) {
            const emailDecoded = atob(email);

            const body: { email: string } = { email: '' };

            body.email = emailDecoded;

            try {
                setIsResendingCode(true);
                await otpClient.sendVerificationOtpEmail(body);
                setResendSuccess(true);
            } catch (error: any) {
                console.log(error);
            } finally {
                setIsResendingCode(false);
            }
        } else {
            console.log(email);
        }
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setVerificationResult(null);
            setResendSuccess(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [verificationResult, resendSuccess]);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.card}>
                {verificationResult !== null && (
                    <div className={verificationResult === 'success' ? styles.successMessage : styles.errorMessage}>
                        {verificationResult === 'success' ? 'Código verificado com sucesso!' : 'Código inválido!'}
                    </div>
                )}
                {resendSuccess && (
                    <div className={styles.successMessage}>
                        Código reenviado com sucesso!
                    </div>
                )}
                <h2 className={styles.heading}>Confirmação de Email</h2>
                {!isCodeSent ? (
                    <div>
                        <div className={styles.subtext}>
                            <p>Insira o código de verificação de 4 dígitos enviado para o seu email.</p>
                            <button
                                className={styles.resend}
                                onClick={handleResendCode}
                                disabled={verificationResult !== null || isResendingCode}
                            >
                                Enviar código novamente
                            </button>
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
                                    disabled={verificationResult !== null || isResendingCode}
                                />
                            ))}
                        </form>
                        <button
                            type="submit"
                            onClick={handleVerificationSubmit}
                            className={styles.button}
                            disabled={verificationResult !== null || isResendingCode}
                        >
                            Verificar
                        </button>
                        <NavLink to={`/register`}>
                            <button
                                className={styles.backButton}
                                onClick={handleBack}
                                disabled={verificationResult !== null || isResendingCode}
                            >
                                Voltar
                            </button>
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
