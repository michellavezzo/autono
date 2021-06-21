import React, { useState } from 'react';
import './styles.scss';

//Api
import api from '../../services/api';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Book } from '../../store/ducks/books/types';
import { ApplicationState } from '../../store';
import { useEffect } from 'react';

//Bootstrap
import Pagination from 'react-bootstrap/Pagination';

//Components
import ModalBook from '../ModalBook';

//IMG
import Logo from '../../assets/LOGO-LIVRO.png';
import { Spinner } from 'react-bootstrap';

const Booklist: React.FC = () => {
  //const dispatch = useDispatch();
  const books = useSelector((state: ApplicationState) => state.books);

  //const [atualBooks, setAtualBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book>(); //tipar obj as book
  const [openModal, setOpenModal] = useState<boolean>(false);

  //const teste = atualBooks.map(books => books.id).toString();
  //const teste = atualBooks;

  console.log('BOOKS', books);

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
