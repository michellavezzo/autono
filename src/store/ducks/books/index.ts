import { Reducer } from 'redux';
import { BookState, BookTypes } from './types';

const INITIAL_STATE: BookState = {
  book: [],
  length: 0,
  searchTerm: '',
}

const reducer: Reducer<BookState> = (
  state = INITIAL_STATE,
  action,
) => {
  let updatedBookState = state;
  
  switch (action.type) {
    
    case BookTypes.SET_BOOKS:
      updatedBookState = action.payload.data;
      console.log('nome aleatorio do reduce: ', updatedBookState);
      return { ...state, ...updatedBookState};

    default:
      return state;
  }
};

export default reducer;



// const INITIAL_STATE: BookState = {
//   book: {
//     id: '',
//     volumeInfo: {
//       title: '',
//       subtitle: '',
//       authors: [],
//       publisher: '',
//       publishedDate: '',
//       description: '',
//       pageCount: 0,
//       categories: [],
//       averageRating: 0,
//       ratingsCount: 0,
//       imageLinks: {
//         thumbnail: '',
//         smallThumbnail: '',
//       },
//       buyLink: '',
//       previewLInk: '',          
//     }   
//   },
//   length: 0
// }

// const INITIAL_STATE: BookState = {
//   book: [],
//   length: 0
// }