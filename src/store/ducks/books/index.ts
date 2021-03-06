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
  favoriteBooks: [],
  atualPage: 1,
};

const reducer: Reducer<BookState> = (state = INITIAL_STATE, action) => {
  let updatedBookState = state;

  switch (action.type) {
    case BookTypes.SET_BOOKS:
      updatedBookState = action.payload.data;
      // localStorage.setItem(
      //   'currentPage',
      //   JSON.stringify(updatedBookState.atualPage),
      // );
      const localStorageFavBooks = JSON.parse(
        localStorage.getItem('favoriteBooks') as string,
      );
      const localStoragePageBooks = parseInt(
        JSON.parse(localStorage.getItem('currentPage') as string),
      );

      return {
        ...state,
        ...updatedBookState,
        favoriteBooks: localStorageFavBooks ?? [],
        atualPage: localStoragePageBooks ?? 0,
      };

    case BookTypes.ADD_FAV_BOOK: // add
      const indexAdd = state.book?.findIndex(
        item => item.id === action.payload.data.id,
      );
      const indexToAddInFavBook = state.favoriteBooks?.findIndex(
        item => item.id === action.payload.data.id,
      );
      let updatedBooks = state.book;
      if ((indexAdd === 0 || indexAdd) && updatedBooks) {
        updatedBooks[indexAdd] = action.payload.data;

        if (indexToAddInFavBook == -1) {
          updatedBookState.favoriteBooks?.push(updatedBooks[indexAdd]);

          localStorage.setItem(
            'favoriteBooks',
            JSON.stringify(updatedBookState.favoriteBooks),
          );
        }
      }
      return { ...state, book: updatedBooks };

    case BookTypes.REMOVE_FAV_BOOK:
      const indexRemove = state.book?.findIndex(
        item => item.id === action.payload.data.id,
      );
      let updatedRemoveBooks = state.book;

      if ((indexRemove === 0 || indexRemove) && updatedRemoveBooks) {
        updatedRemoveBooks[indexRemove] = action.payload.data;

        console.log(
          'ARRAY BOOK REMOVIDO DO FAV: ',
          updatedRemoveBooks[indexRemove],
        );
        //localStorage.setItem();
        const indexToRemoveInFavBook = state.favoriteBooks?.findIndex(
          item => item.id === action.payload.data.id,
        );
        if (indexToRemoveInFavBook || indexToRemoveInFavBook === 0) {
          console.log('ARRAY INDEX DO BOOK REMOVIDO: ', indexToRemoveInFavBook);

          const bookRemoved = updatedBookState.favoriteBooks?.splice(
            indexToRemoveInFavBook,
            1,
          );
          localStorage.setItem(
            'favoriteBooks',
            JSON.stringify(updatedBookState.favoriteBooks),
          );
        }
      }
      return { ...state, ...updatedBookState, book: updatedRemoveBooks };

    default:
      return state;
  }
};

export default reducer;
