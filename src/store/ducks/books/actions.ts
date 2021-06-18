import { action } from 'typesafe-actions';
import {
  BookTypes, Book
} from './types';


export const loadRequest = () => {action(BookTypes.LOAD_REQUEST)};

export const loadSuccess = (data: Book[]) => {action(BookTypes.LOAD_SUCCESS, data)};

export const loadFailure = () => {action(BookTypes.LOAD_FAILURE)};

//DISPATCH

