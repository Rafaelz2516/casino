import { Game } from '../schemas/game.schema';

export class GameDto {
  readonly name: string;
  readonly description: string;

  constructor(object: Game) {
    this.name = object.name;
    this.description = object.description;
  }
}
