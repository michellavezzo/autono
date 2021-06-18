import { action } from 'typesafe-actions';

import {
  BookTypes, BookState
} from './types';

export const setBooks = (data: BookState) => (
  action(BookTypes.SET_BOOKS, { data })  
);







