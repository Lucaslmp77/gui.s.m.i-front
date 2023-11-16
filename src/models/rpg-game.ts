import { User } from "./user";

export class RpgGame {
    id!: string;
    name!: string;
    description!: string
    userId!: string
    user!: User

    constructor() {
        this.user = new User()
    }
}