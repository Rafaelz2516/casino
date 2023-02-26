import { useEffect, useState } from 'react';

import { getGames } from '../api/games';
import { Game } from '../models/game';
import GameCard from './GameCard';
import Loading from './Loading';

interface ListProps {
  query: string;
}

const List = ({ query }: ListProps) => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLastPage, setIsLastPage] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect((): void => {
    setPage(0);
  }, [setPage, query]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const initGames = async (): Promise<void> => {
      setLoading(true);
      try {
        const data = await getGames(`${query}page=${page}`, signal);
        setGames((oldGamesList) =>
          data.page === 0 ? data.results : [...oldGamesList, ...data.results]
        );
        setIsLastPage(data.totalPages - data.page === 1);
        setLoading(false);
      // eslint-disable-next-line no-empty
      } catch (e) {}
    };

    initGames();
    return () => {
      controller.abort();
    };
  }, [query, page]);

  const onSeeMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid gap-4 md:grid-cols-4">
          {games.map((game) => (
            <GameCard key={game.name} game={game} />
          ))}
        </div>
      )}
      {!isLastPage && (
        <button
          type="button"
          onClick={onSeeMore}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          See more...
        </button>
      )}
    </>
  );
};

export default List;
