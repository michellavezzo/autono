/**
 * Action types
 * @SET_BOOKS
 * @ADD_FAV_BOOK
 * @REMOVE_FAV_BOOK
 */
export enum BookTypes {
  SET_BOOKS = '@shelfBooks/SET_BOOKS',
  ADD_FAV_BOOK = '@shelfBooks/ADD_FAV_BOOK',
  REMOVE_FAV_BOOK = '@shelfBooks/REMOVE_FAV_BOOK',
}
/**
 * State type
 * @data : Book
 * @length : number
 */
export interface BookState {
  book?: Book[];
  length?: number;
  searchTerm?: string;
  favoriteBooks?: Book[];
}

/**
 * Data types
 * @id : id
 * @volumeInfo : Book Info
 */

export interface Book {
  id: string;
  favorite: boolean;
  volumeInfo: BookDescription;
}

interface BookDescription {
  title: string;
  subtitle?: string;
  authors: [];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories: [];
  averageRating?: number;
  ratingsCount?: number;
  imageLinks: {
    thumbnail: string;
    smallThumbnail?: string;
  };
  buyLink: string;
  previewLink: string;
}
