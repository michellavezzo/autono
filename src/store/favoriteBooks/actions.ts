import { action } from 'typesafe-actions';

import {
  BookTypes, FavoriteBookState
} from './types';

export const addFavBook = (book: FavoriteBookState) => (
  action(BookTypes.ADD_FAV_BOOK, { book })
);
export const removeFavBook = (book: FavoriteBookState) => (
  action(BookTypes.REMOVE_FAV_BOOK, { book })
);




//DISPATCH

