import axios, { AxiosInstance } from "axios";

export class OtpClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3333/api/otp',
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    public async verifyUserEmail(body: { email: string, otp: string }): Promise<any> {
        try {
            return (await this.axiosClient.post(`/email-verification/verify/${body.email}`, body)).data;
        } catch (error: any) {
            if (error.response && error.response.status === 500) {
                return Promise.reject('Código inválido!');
            } else {
                return Promise.reject(error.response);
            }
        }
    }
}