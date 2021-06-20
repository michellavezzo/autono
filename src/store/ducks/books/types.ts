

/**
 * Action types
 * @SET_BOOKS
 */
export enum BookTypes {
  SET_BOOKS = '@shelfBooks/SET_BOOKS',
}
/**
 * State type
 * @data : Book
 * @length : number
 */
export interface BookState {
  book: Book[];
  length: number;
  searchTerm: string;
}

/**
 * Data types
 * @id : id
 * @volumeInfo : Book Info 
 */

export interface Book {
  id: string,
  volumeInfo: BookDescription,
}

interface BookDescription{
  title: string
  subtitle?: string
  authors: []
  publisher?: string
  publishedDate?: string
  description?: string
  pageCount?: number
  categories: []
  averageRating?: number
  ratingsCount?: number
  imageLinks: {
    thumbnail: string
    smallThumbnail?: string
  }
  buyLink?: string
  previewLInk?: string

}
