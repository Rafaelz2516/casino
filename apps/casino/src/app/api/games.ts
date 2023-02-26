import { Game } from '../models/game';
import { PaginateResult } from '../models/paginate-result';
import { GET } from './config';

export const getGames = (
  query: string,
  signal: AbortSignal
): Promise<PaginateResult<Game>> => GET(`/game${query}`, signal);

export const getGame = (name: string) => GET(`/game/${name}`);
