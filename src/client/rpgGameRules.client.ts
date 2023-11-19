import axios, { AxiosInstance } from "axios";
import { GameRules } from "../models/gameRules";

interface IRpgGameRulesClient {
    save(rules: any): Promise<GameRules>;
    findAll(): Promise<GameRules[]>;
    findUnique(id: string): Promise<GameRules>;
    update(id: string, rpg: GameRules): Promise<GameRules>;
    delete(id: string): Promise<void>;
}

export class RpgGameRulesClient implements IRpgGameRulesClient {
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

    public async save(rules: any): Promise<GameRules> {
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
