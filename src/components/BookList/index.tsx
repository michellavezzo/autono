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
import { removeFavBook, addFavBook } from '../../store/ducks/books/actions';

const Booklist: React.FC = () => {
  const dispatch = useDispatch();
  let books = useSelector((state: ApplicationState) => state.books);

  //const [atualBooks, setAtualBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book>(); //tipar obj as book
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [favBook, setFavBook] = useState<Book>();
  const [selectedFavBook, setSelectedFavBook] = useState<Book>({} as Book);
  const [statefavBook, setStateFavBook] = useState<boolean>(false);

  function updateFavoriteBook(book: Book, favorite: boolean) {
    !favorite
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
  useEffect(() => {
    updateFavoriteBook(selectedFavBook, selectedFavBook.favorite);
    console.log('useEffect', selectedFavBook);
    //console.log('BOOK STATE', !selectedFavBook.favorite);
  }, [selectedFavBook]);

  //useCallback(() => {}, [books]);

  return (
    <>
      <div className="booklist">
        <h1>Livros sobre: {books.searchTerm}</h1>
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
                  {book.favorite ? 'favorito out' : 'nao favorito out'}
                  <img
                    src={book.favorite ? BookMarkFavorite : BookMarkNotFavorite}
                    onClick={() => {
                      setSelectedFavBook(book);
                      {
                      }
                    }}
                  />
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
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
