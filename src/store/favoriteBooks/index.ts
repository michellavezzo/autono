import { Reducer } from 'redux';
import { FavoriteBookState, BookTypes, Book } from './types';

const INITIAL_STATE: FavoriteBookState = {
  book: [],
}

const reducer: Reducer<FavoriteBookState> = (
  state = INITIAL_STATE,
  action,
) => {
  const updatedFavBookState = state;
  
  switch (action.type) {
    
    case BookTypes.ADD_FAV_BOOK:
      updatedFavBookState.book = action.payload.book;

      return { ...state, ...updatedFavBookState};
    case BookTypes.REMOVE_FAV_BOOK:
      updatedFavBookState.book = action.payload.book;

      return { ...state, ...updatedFavBookState};

    default:
      return state;
  }
};

export default reducer;

//quando setar no redux, setar no local storage
