import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaginateResult } from '../shared/dto/paginate-result';
import { FindGamesQuery } from './dto/findGamesQuery.dto';
import { GameDto } from './dto/game.dto';
import { GameService } from './game.service';

@UseGuards(JwtAuthGuard)
@Controller('/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async findAll(
    @Query() query?: FindGamesQuery
  ): Promise<PaginateResult<GameDto>> {
    return this.gameService.findAll(query);
  }

  @Get('/:name')
  async findGame(@Param('name') name: string): Promise<GameDto> {
    return this.gameService.findByName(name);
  }
}
