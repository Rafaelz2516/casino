import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PaginateResult } from '../shared/dto/paginate-result';
import { games } from '../shared/games';
import { FindGamesQuery } from './dto/findGamesQuery.dto';
import { GameDto } from './dto/game.dto';
import { Game, GameDocument } from './schemas/game.schema';

const PAGE_LIMIT = 8;
@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<GameDocument>
  ) {
    this.createInitialGames(); // only to fill the DB
  }

  async findAll({
    page: pageParam,
    name,
  }: FindGamesQuery): Promise<PaginateResult<GameDto>> {
    const offset = (pageParam && pageParam * PAGE_LIMIT) || 0;
    const filter = name
      ? { name: { $regex: '.*' + name + '.*', $options: 'i' } }
      : null;
    const games = await this.gameModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(PAGE_LIMIT)
      .lean();

    const totalResults = await this.gameModel.count().exec();
    const totalPages = Math.ceil(totalResults / PAGE_LIMIT);
    const page = Math.floor(offset / PAGE_LIMIT);

    return { results: games, totalResults, totalPages, page };
  }

  async findByName(name: string): Promise<GameDto> {
    const game = await this.gameModel.findOne({ name }).lean();
    if (!game) {
      throw new NotFoundException(`Game with the name: ${name} not found!`);
    }
    return new GameDto(game);
  }
  async createInitialGames(): Promise<void> {
    const totalResults = await this.gameModel.count().exec();
    if (totalResults === 0) {
      for (const gameDto of games) {
        const game = new this.gameModel(gameDto);
        await game.save();
      }
    }
  }
}
