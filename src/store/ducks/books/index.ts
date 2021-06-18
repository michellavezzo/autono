import { Reducer } from 'redux';
import { BookState, BookTypes } from './types';

const INITIAL_STATE: BookState = {
  data: [],
  error: false,
  loading: false,
}

const reducer: Reducer<BookState> = (
  state = INITIAL_STATE,
  action,
) => {
  const updatedBookState = state;

  switch (action.type) {
    case BookTypes.LOAD_REQUEST:
      
      // localStorage.setItem(
      //   environment.REACT_APP_LOCAL_STORAGE_USER_AUTH,
      //   JSON.stringify(),
      // );

      return { ...state, loading: true };

    case BookTypes.LOAD_SUCCESS:
      // localStorage.removeItem(
      //   environment.REACT_APP_LOCAL_STORAGE_USER_AUTH,
      // );
      return { ...state, loading: false, error: false, data: action.payload.data };

    case BookTypes.LOAD_FAILURE:
      // localStorage.removeItem(
      //   environment.REACT_APP_LOCAL_STORAGE_USER_AUTH,
      // );
      return { ...state, loading: false, error: true, data: [] };

    default:
      return state;
  }
};



export default reducer;

//quando setar no redux, setar no local storage
