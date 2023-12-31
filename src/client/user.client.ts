import axios, { AxiosInstance } from "axios";
import { User } from "../models/user";

export class UserClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3333/api/accounts',
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    public async save(user: User): Promise<User> {
        try {
            return (await this.axiosClient.post('', user)).data
        }
        catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findUserByEmail(email: string): Promise<User> {
        try {
            return (await this.axiosClient.get<User>(`/${email}`)).data
        }
        catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async delete(email: string): Promise<any> {
        try {
            return (await this.axiosClient.delete(`${email}`)).data
        }
        catch (error: any) {
            return Promise.reject(error.response)
        }
    }
}