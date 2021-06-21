import { action } from 'typesafe-actions';

import { BookTypes, BookState, Book } from './types';

export const setBooks = (data: BookState) =>
  action(BookTypes.SET_BOOKS, { data });

/**
 * @param data  : Book
 */
export const addFavBook = (data: Book) =>
  action(BookTypes.ADD_FAV_BOOK, { data });

/**
 * @param data  : Book
 */
export const removeFavBook = (data: Book) =>
  action(BookTypes.REMOVE_FAV_BOOK, { data });
