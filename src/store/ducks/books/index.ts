import { Reducer } from 'redux';
import { BookState, BookTypes } from './types';

const INITIAL_STATE: BookState = {
  book: [],
  length: 0
}


const reducer: Reducer<BookState> = (
  state = INITIAL_STATE,
  action,
) => {
  const updatedBookState = state;
  
  switch (action.type) {
    
    case BookTypes.SET_BOOKS:
      updatedBookState.book = action.payload.book;

      return { ...state, ...updatedBookState};

    default:
      return state;
  }
};

export default reducer;



// const INITIAL_STATE: BookState = {
//   book: [{
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
//   }],
//   length: 0
// }