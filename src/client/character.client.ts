import axios, { AxiosInstance } from "axios";
import { RpgGameData } from "../models/rpg-game-data.ts";
import { Character } from "../models/character.ts";

export class CharacterClient {
    private axiosClient: AxiosInstance;
    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3333/api/character',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
    }

    public async save(character: Character): Promise<Character> {
        try {
            return (await this.axiosClient.post('', character)).data
        }
        catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findAll(page: number): Promise<Character[]> {
        try {
            return (await this.axiosClient.get(`?page=${page}`,)).data
        }
        catch (error: any) {
            return Promise.reject(error.response)
        }
    }


    public async findUnique(id: string): Promise<Character> {
        try {
            return (await this.axiosClient.get<Character>(`/${id}`)).data
        }
        catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async countCharactersByUser(userId: string): Promise<any> {
        try {
            return (await this.axiosClient.get(`/countCharactersByUser/${userId}`)).data;
        } catch (error) {
            throw error;
        }
    }

    public async findCharacterByUser(userId: string, page: number): Promise<Character[]> {
        try {
            return (await this.axiosClient.get(`/findCharacterByUser/${userId}?page=${page}`)).data;
        } catch (error) {
            throw error;
        }
    }

    public async update(id: string, rpg: RpgGameData): Promise<Character> {
        try {
            return (await this.axiosClient.put(`/${id}`, rpg)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }
}