import { Reducer } from 'redux';
import { UserState, UserTypes } from './types';

const INITIAL_STATE: UserState = {
  user: {
    id: '',
    token: '',
    email: '',
    name: '',
  },
};

const reducer: Reducer<UserState> = (
  state = INITIAL_STATE,
  action,
) => {
  const updatedUserState = state;
  console.log('passando user pelo reducer no index.ts 1 ', action);
  switch (action.type) {
    case UserTypes.UPDATE_USER:
      updatedUserState.user = action.data.user;
      console.log('passando pelo reducer user no index.ts 2');
      // localStorage.setItem(
      //   environment.REACT_APP_LOCAL_STORAGE_USER_AUTH,
      //   JSON.stringify(),
      // );

      return { ...state, ...updatedUserState };

    case UserTypes.REMOVE_USER:
      // localStorage.removeItem(
      //   environment.REACT_APP_LOCAL_STORAGE_USER_AUTH,
      // );
      return { ...state, ...INITIAL_STATE };

    default:
      return state;
  }
};

export default reducer;


