import { createStore, applyMiddleware, Store } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { UserState } from './ducks/user/types';
import { BookState } from './ducks/books/types';

import rootReducer from './ducks/rootReducer';
console.log('to no index do store');

export interface ApplicationState {
  user: UserState,
  books: BookState,
}
let middleware: any = [];

if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}
const store: Store<ApplicationState> = createStore(rootReducer,
  applyMiddleware(...middleware));

export default store;
