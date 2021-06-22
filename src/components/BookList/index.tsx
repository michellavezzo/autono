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
import MyPagination from '../Pagination';

const Booklist: React.FC = () => {
  const dispatch = useDispatch();
  let books = useSelector((state: ApplicationState) => state.books);
  const localStorageBooks = JSON.parse(
    localStorage.getItem('favoriteBooks') as string,
  );

  //const [atualBooks, setAtualBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book>(); //tipar obj as book
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [favBook, setFavBook] = useState<Book>();
  const [selectedFavBook, setSelectedFavBook] = useState<Book>(
    localStorageBooks ?? ({} as Book),
  );
  const [statefavBook, setStateFavBook] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(books.length ?? 1);
  const [postsPerPage] = useState(6);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
  useEffect(() => {
    updateFavoriteBook(selectedFavBook);
    console.log('useEffect', selectedFavBook);
    //console.log('BOOK STATE', !selectedFavBook.favorite);
  }, [selectedFavBook]);

  function updatePage(page: number) {
    dispatch(
      setBooks({
        atualPage: page,
      }),
    );
  }
  useEffect(() => {
    updatePage(currentPage);
    console.log('Current Page', currentPage);
    //console.log('BOOK STATE', !selectedFavBook.favorite);
  }, [currentPage]);

  useCallback(() => {}, [books]);

  return (
    <>
      <div className="booklist">
        <h1>{books.searchTerm}</h1>
        <ul>
          {books.length == 0 ? (
            <Spinner animation="border" variant="danger" />
          ) : (
            books.book &&
            books.book.length &&
            books.book.map(book => (
              <li>
                <img
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
                  <span>Detalhes</span>
                </button>
                <div className="fav-icon">
                  <img
                    src={book.favorite ? BookMarkFavorite : BookMarkNotFavorite}
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
      <Pagination>
        <Pagination.Item onClick={() => setCurrentPage(1)}>{1}</Pagination.Item>

        <Pagination.Prev
          onClick={() => setCurrentPage(currentPage <= 1 ? 1 : currentPage - 1)}
        />

        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Item onClick={() => setCurrentPage(currentPage + 1)}>
          {currentPage + 1}
        </Pagination.Item>
        <Pagination.Item onClick={() => setCurrentPage(currentPage + 2)}>
          {currentPage + 2}
        </Pagination.Item>
        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
        <Pagination.Item onClick={() => setCurrentPage(books.length ?? 10)}>
          {books.length ?? 10}
        </Pagination.Item>
      </Pagination>

      {selectedBook && ( /// isso é um if, se selected boook tiver valor... chaves == jasvcriopst, p usar if tem q ter func, p abstrair usa isso
        <ModalBook
          book={selectedBook}
          show={openModal}
          onHide={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default Booklist;
