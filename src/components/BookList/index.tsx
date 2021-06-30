import React, { useState, useCallback } from 'react';
import './styles.scss';

//Api
import api from '../../services/api';

import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Book, BookState } from '../../store/ducks/books/types';
import { ApplicationState } from '../../store';
import { useEffect } from 'react';

//Bootstrap
import Pagination from 'react-bootstrap/Pagination';

//Components
import ModalBook from '../ModalBook';
import MyPagination from '../Pagination';

import Lodash from 'lodash';

//IMG
import Logo from '../../assets/LOGO-LIVRO.png';
import BookMarkFavorite from '../../assets/bookmark.svg';
import BookMarkNotFavorite from '../../assets/bookmark-outline.svg';
import { Spinner } from 'react-bootstrap';
import {
  removeFavBook,
  addFavBook,
  setBooks,
} from '../../store/ducks/books/actions';

const Booklist: React.FC = () => {
  const dispatch = useDispatch();
  let books = useSelector((state: ApplicationState) => state.books);
  const localStorageBooks = JSON.parse(
    localStorage.getItem('favoriteBooks') as string,
  );

  const [selectedBook, setSelectedBook] = useState<Book>(); //tipar obj as book
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [favBook, setFavBook] = useState<Book>();
  const [selectedFavBook, setSelectedFavBook] = useState<Book>(
    localStorageBooks ?? ({} as Book),
  );
  const [statefavBook, setStateFavBook] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState(10);
  const indexLastPost = currentPage * postsPerPage; //
  const indexFirstPost = indexLastPost - postsPerPage;
  const [currentPosts, setCurrentPosts] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    let atualCategories: string[] = [];
    if (books && books.book && books.book.length) {
      books.book.map(book => {
        if (book.volumeInfo.categories) {
          atualCategories.push(...book.volumeInfo.categories);
        }
      });
      //console.log('atualCategories: ', atualCategories);
      atualCategories = Lodash.uniq(atualCategories);
      setCategories(atualCategories);

      setCurrentPosts(books.book);
    }
    //console.log('atualCategories: ', atualCategories);
  }, [books]);

  useEffect(() => {
    updateFavoriteBook(selectedFavBook);
    //console.log('useEffect', selectedFavBook);
    //console.log('BOOK STATE', !selectedFavBook.favorite);
  }, [selectedFavBook]);

  useEffect(() => {
    updatePage(currentPage);
    //console.log('Current Page', currentPage);
    //console.log('BOOK STATE', !selectedFavBook.favorite);
  }, [currentPage]);

  function updateFavoriteBook(book: Book) {
    if (books && books.length && books.book) {
      !book.favorite
        ? dispatch(
            addFavBook({
              id: book.id,
              favorite: true,
              volumeInfo: book.volumeInfo,
            }),
          )
        : dispatch(
            removeFavBook({
              id: book.id,
              favorite: false,
              volumeInfo: book.volumeInfo,
            }),
          );
    }
  }

  function updatePage(page: number) {
    if (books && books.length && books.book) {
      dispatch(
        setBooks({
          atualPage: page,
        }),
      );
    }
  }

  function filterBycat(categorie: string) {
    const atualFilteredBooks: Book[] = [];
    //categories: o meu array de categorias
    //.filter(collection, [predicate=_.identity])
    //console.log(categorie);
    if (books && books.book && books.book.length) {
      books.book.map(book => {
        if (book.volumeInfo.categories) {
          if (book.volumeInfo.categories.toString() == categorie) {
            atualFilteredBooks.push(book);
            //console.log('true');
          }
        }
        //console.log(Lodash.findIndex(book.volumeInfo.categories, categorie));
      });
      //reduce no array.. pesquisar
      setCurrentPosts(atualFilteredBooks);

      //console.log(atualFilteredBooks);
    }
  }

  return (
    <>
      <div className="booklist">
        <h1>{books.searchTerm}</h1>
        <div className="container-list">
          <ul>
            {books.length == 0 ? (
              <div className="spinner">
                <Spinner animation="border" variant="danger " />
              </div>
            ) : (
              currentPosts.slice(indexFirstPost, indexLastPost).map(book => (
                <li>
                  <img
                    className="main-img"
                    src={
                      book.volumeInfo.imageLinks
                        ? book.volumeInfo.imageLinks.thumbnail
                        : Logo
                    }
                    alt={book.volumeInfo.title}
                  />
                  {book.volumeInfo.title}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedBook(book);
                      setOpenModal(true);
                    }}
                  >
                    <span className="span">Detalhes</span>
                  </button>
                  <div className="fav-icon">
                    <img
                      src={
                        book.favorite ? BookMarkFavorite : BookMarkNotFavorite
                      }
                      onClick={() => {
                        setSelectedFavBook(book);
                        setStateFavBook(!book.favorite);
                      }}
                    />
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="categories">
          {categories.map(cat => (
            <ul>
              <li>
                <div className="catBtn">
                  <button
                    type="button"
                    onClick={() => {
                      filterBycat(cat);
                    }}
                  >
                    <span className="span">{cat}</span>
                  </button>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>

      {selectedBook && (
        <ModalBook
          book={selectedBook}
          show={openModal}
          onHide={() => setOpenModal(false)}
        />
      )}
      <div className="pagination">
        <MyPagination
          postsPerPage={postsPerPage}
          totalPosts={
            books && books.book && books.length ? books.book.length : 0
          }
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default Booklist;
