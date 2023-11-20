import { RpgGame } from "./rpg-game";

export class GameRules {
    id!: string;
    name!: string;
    description!: string;
    rpgGameId!: string;
    rpgGame!: RpgGame;
  }