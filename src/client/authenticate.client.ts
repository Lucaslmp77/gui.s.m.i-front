import axios, { AxiosInstance } from "axios";
import { Authenticate } from "../models/authenticate";

export class AuthenticateClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3333/api/sessions',
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    public async authenticate(authenticate: Authenticate): Promise<Authenticate> {
        try {
            return (await this.axiosClient.post('', authenticate)).data
        }
        catch (error: any) {
            return Promise.reject(error.response)
        }
    }
}