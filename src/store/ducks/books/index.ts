import { Reducer } from 'redux';
import { BookState, BookTypes } from './types';

const INITIAL_STATE: BookState = {
  book: [
    {
      id: '',
      favorite: false,
      volumeInfo: {
        title: '',
        subtitle: '',
        authors: [],
        publisher: '',
        publishedDate: '',
        description: '',
        pageCount: 0,
        categories: [],
        averageRating: 0,
        ratingsCount: 0,
        imageLinks: {
          thumbnail: '',
          smallThumbnail: '',
        },
        buyLink: '',
        previewLink: '',
      },
    },
  ],
  length: 0,
  searchTerm: '',
};

const reducer: Reducer<BookState> = (state = INITIAL_STATE, action) => {
  let updatedBookState = state;

  switch (action.type) {
    case BookTypes.SET_BOOKS:
      updatedBookState = action.payload.data;
      return { ...state, ...updatedBookState };

    case BookTypes.ADD_FAV_BOOK: // add
      const indexAdd = state.book?.findIndex(
        item => item.id === action.payload.data.id,
      );
      let updatedBooks = state.book;
      if ((indexAdd === 0 || indexAdd) && updatedBooks) {
        updatedBooks[indexAdd] = action.payload.data;

        console.log('BOOK ADICIONADO AOS FAV: ', updatedBooks[indexAdd]);
        //localStorage.setItem();
      } else return { ...state, book: updatedBooks };

    case BookTypes.REMOVE_FAV_BOOK:
      const indexRemove = state.book?.findIndex(
        item => item.id === action.payload.data.id,
      );
      let updatedRemoveBooks = state.book;
      if ((indexRemove === 0 || indexRemove) && updatedRemoveBooks) {
        updatedRemoveBooks[indexRemove] = action.payload.data;
        console.log('BOOK REMOVIDO DO FAV: ', updatedRemoveBooks[indexRemove]);
        //localStorage.setItem();
      }
      return { ...state, book: updatedRemoveBooks };

    default:
      return state;
  }
};

export default reducer;
