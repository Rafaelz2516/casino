import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaginateResult } from '../shared/dto/paginate-result';
import { FindGamesQuery } from './dto/findGamesQuery.dto';
import { GameDto } from './dto/game.dto';
import { GameService } from './game.service';

@Controller('/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async register(
    @Query() query?: FindGamesQuery
  ): Promise<PaginateResult<GameDto>> {
    return this.gameService.findAll(query);
  }
}
