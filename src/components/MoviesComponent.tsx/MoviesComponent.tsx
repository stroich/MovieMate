import React from 'react';
import List from '../ListMovies/ListMovies';
import {ListMoviesType} from '../../types/moviesTypes';
import Loading from '../Loading/Loading';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

type MoviesComponentProps = {
  isLoading: boolean;
  moviesData: ListMoviesType | null;
  error?: null | string;
  onEndReached: () => void;
};

function MoviesComponent({
  isLoading,
  error = null,
  moviesData,
  onEndReached,
}: MoviesComponentProps) {
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!moviesData) {
    return null;
  }

  if (!moviesData.length) {
    return <ErrorMessage error={'Movies not found!'} />;
  }

  return <List data={moviesData} onEndReached={onEndReached} />;
}

export default MoviesComponent;
