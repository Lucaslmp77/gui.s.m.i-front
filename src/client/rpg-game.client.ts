import axios, {AxiosInstance} from "axios";
import {RpgGame} from "../models/rpg-game.ts";
import {RpgGameData} from "../models/rpg-game-data.ts";

export class RpgGameClient {
    private axiosClient: AxiosInstance;
    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3333/api/rpg-game',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
    }

    public async save(rpg: RpgGameData): Promise<RpgGame> {
        try {
            return (await this.axiosClient.post('', rpg)).data
        }
        catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findAll(page: number): Promise<RpgGame[]> {
        try {
            return (await this.axiosClient.get(`?page=${page}`,)).data
        }
        catch (error: any) {
            return Promise.reject(error.response)
        }
    }


    public async findUnique(id: string): Promise<RpgGame>{
        try {
            return (await this.axiosClient.get<RpgGame>(`/${id}`)).data
        }
        catch (error: any) {
            return Promise.reject(error.response)
        }
    }
  
    public async findRpgByUser(userId: string, page: number): Promise<RpgGame[]> {
        try {
            return (await this.axiosClient.get(`/findRpgByUser/${userId}?page=${page}`)).data;
        } catch (error) {
            throw error;
        }
    }

    public async update(id: string, rpg: RpgGameData): Promise<RpgGame> {
        try {
          return (await this.axiosClient.put(`/${id}`, rpg)).data;
        } catch (error: any) {
          return Promise.reject(error.response);
        }
      }
}