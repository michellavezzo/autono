/**
 * Action types
 * @LOAD_REQUEST ...
 * @LOAD_SUCCESS ...
 * @LOAD_FAILURE ...
 */
export enum BookTypes {
  LOAD_REQUEST = '@shelfBooks/LOAD_REQUEST',
  LOAD_SUCCESS = '@shelfBooks/LOAD_SUCCESS',
  LOAD_FAILURE = '@shelfBooks/LOAD_FAILURE',
}

/**
 * State type
 * @data : Book
 */
export interface BookState {
  readonly data: Book[]
  readonly loading: boolean
  readonly error: boolean
}
/**
 * Data types
 * @id : token of user
 * @volumeInfo : name of user
 */
export interface Book{
  book: BookInfo
}

export interface BookInfo {
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
