/**
 * Action types
 * @...
 */
export enum BookTypes {
  ADD_FAV_BOOK = '@shelfBooks/ADD_FAVORITE_BOOK',
  REMOVE_FAV_BOOK = '@shelfBooks/REMOVE_FAVORITE_BOOK',
}

/**
 * State type
 * @data : Book
 */

export interface FavoriteBookState {
  book: Book[]
}

/**
 * Data types
 * @id : token of user
 * @volumeInfo : name of user
 */

export interface Book {
  id: string
  volumeInfo: BookDescription
}

interface BookDescription{
  title: string
  subtitle?: string
  authors: []
  publisher?: string
  publishedDate?: string
  description?: string
  pageCount: number
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
