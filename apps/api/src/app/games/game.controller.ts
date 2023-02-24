import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { GameService } from './game.service';
import { Game } from './schemas/game.schema';

@Controller('/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async register(): Promise<Game[]> {
    return [];
  }
}
