import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PaginateResult } from '../shared/dto/paginate-result';
import { games } from '../shared/games';
import { FindGamesQuery } from './dto/findGamesQuery.dto';
import { GameDto } from './dto/game.dto';
import { Game, GameDocument } from './schemas/game.schema';

const PAGE_LIMIT = 4;
@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<GameDocument>
  ) {
    this.createInitialGames(); // only to fill the DB
  }

  async findAll(
    queryParams?: FindGamesQuery
  ): Promise<PaginateResult<GameDto>> {
    console.log(queryParams);
    const offset = (queryParams?.page && queryParams.page * PAGE_LIMIT) || 0;

    const games = await this.gameModel
      .find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(PAGE_LIMIT)
      .lean();

    const totalResults = await this.gameModel.count().exec();
    const totalPages = Math.ceil(totalResults / PAGE_LIMIT);
    const page = Math.floor(offset / PAGE_LIMIT);

    return { results: games, totalResults, totalPages, page };
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
