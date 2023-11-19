import axios, { AxiosInstance } from "axios";
import { GameRules } from "../models/gameRules";

export class RpgGameRulesClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3333/api/game-rule',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }

    public async save(rules: GameRules): Promise<GameRules> {
        try {
            return (await this.axiosClient.post('', rules)).data
        }
        catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findAll(): Promise<GameRules[]> {
        try {
            return (await this.axiosClient.get<GameRules[]>(`/`)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }

    public async findUnique(id: string): Promise<GameRules>{
        try {
            return (await this.axiosClient.get<GameRules>(`/${id}`)).data
        }
        catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async update(id: string, rpg: GameRules): Promise<GameRules> {
        try {
            return (await this.axiosClient.put(`/${id}`, rpg)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }

    public async delete(id: string): Promise<void> {
        try {
            await this.axiosClient.delete(`/${id}`);
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }
}
