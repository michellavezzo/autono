import React, { FormEvent, useCallback, useEffect } from 'react';
import { useState } from 'react';
import './styles.scss';

//Bootstrap
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Form, FormControl, Navbar, NavDropdown } from 'react-bootstrap';

//Hooks, redux
import { useDispatch, useSelector } from 'react-redux';

//Api
import api from '../../services/api';
import { env } from '../../env/env';

//img
import Logo from '../../assets/LOGO-LIVRO.png'; //adicionar star icon
import BookMark from '../../assets/bookmark-outline.svg';

//Interface (types)
import { Book, BookState } from '../../store/ducks/books/types';
import { setBooks } from '../../store/ducks/books/actions';
import { ApplicationState } from '../../store';

//miscellaneous
//import * as faker from 'faker';
import * as faker from 'faker';

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  let selectorBooks = useSelector((state: ApplicationState) => state.books);

  // let selectorPage = useSelector(
  //   (state: ApplicationState) => state.books.atualPage,
  // );
  const [bookSearch, setBookSearch] = useState<string>('');
  const [randomBookSearch, setRandomBookSearch] = useState<string>('');
  const [atualBooks, setAtualBooks] = useState<Book[]>([]);
  const [initialState, setInitialState] = useState<boolean>(false);
  const [atualPage, setAtualPage] = useState<number>(
    selectorBooks.atualPage ?? 0,
  );

  //random book fake name.jobArea/jobType/ random.objectElement
  console.log(bookSearch);

  //useEWffect
  const search = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault(); //prevenir comportamento padrão de recarregfar a pageina
      console.log('dentro do search');
      if (bookSearch !== '') {
        api
          .get(
            `volumes?q=${bookSearch}&key=${env.GOOGLE_API_KEY}&maxResults=10&startIndex${selectorBooks.atualPage}`,
          )
          .then(response => {
            // setAtualBooks(response.data.items);
            // setResponseLenght(response.data.totalItems); // apagar dps
            console.log('RESPONSE ADAS: ', response.data.items);
            updateBookList(
              response.data.items,
              response.data.totalItems,
              'Livros sobre: ' + bookSearch,
            );
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    [bookSearch],
  );

  useEffect(() => {
    randTerm();
  }, [atualBooks]);
  //GETTING RANDOM BOOKS TO INITIAL STATE

  useEffect(() => {
    randTerm();
    setInitialState(true);
  }, []);
  useEffect(() => {
    randomSearch();
  }, [initialState]);

  const randTerm = () => {
    if (faker.datatype.boolean()) {
      console.log('FAKER SEARCH TERM: ', faker.name.jobArea());
      setRandomBookSearch(faker.name.jobArea());
    } else {
      console.log('FAKER SEARCH TERM: ', faker.random.word());
      setRandomBookSearch(faker.random.word());
    }
  };

  const randomSearch = useCallback(() => {
    //event.preventDefault(); //prevenir comportamento padrão de recarregfar a pageina
    console.log('termo dentro do random: ', randomBookSearch);
    console.log('dentro do randomBook');

    api
      .get(
        `volumes?q=${randomBookSearch}&key=${env.GOOGLE_API_KEY}&maxResults=10&startIndex${selectorBooks.atualPage}`,
      )
      .then(response => {
        // setAtualBooks(response.data.items);
        // setResponseLenght(response.data.totalItems); // apagar dps
        console.log('RESPONSE: ', response.data.items);
        updateBookList(
          response.data.items,
          response.data.totalItems,
          'Livros sobre: ' + randomBookSearch,
        );
      })
      .catch(err => {
        console.log('randomSearch ERROR:', err);
      });
  }, [randomBookSearch]);

  const favoriteBooks = useCallback(() => {
    if (selectorBooks.favoriteBooks) {
      updateBookList(
        selectorBooks.favoriteBooks,
        selectorBooks.favoriteBooks?.length,
        'Livros Favoritos',
      );
    }
    //event.preventDefault(); //prevenir comportamento padrão de recarregfar a pageina
    console.log('termo dentro do FAVBOOKS: ', selectorBooks.favoriteBooks);
    console.log('dentro do randomBook');

    //updateBookList();
  }, [selectorBooks.favoriteBooks]);

  function updateBookList(
    book: Book[],
    totalItems: number,
    searchTerm: string,
  ) {
    setAtualBooks(book);
    // const searchTerm= isRandomSearch ? bookSearch : randomBookSearch;
    const favoriteBooks =
      selectorBooks.favoriteBooks &&
      selectorBooks.favoriteBooks.length &&
      selectorBooks.favoriteBooks[0].id === undefined
        ? []
        : selectorBooks.favoriteBooks;
    return dispatch(
      setBooks({
        book: book,
        length: totalItems,
        searchTerm: searchTerm,
        favoriteBooks: favoriteBooks ?? [],
      }),
    );
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Form inline onSubmit={search}>
              <FormControl
                type="text"
                placeholder="Comece por aqui"
                className="mr-sm-2"
                onChange={event => setBookSearch(event.target.value)}
              />
              <Button
                variant="btn btn-danger"
                onClick={(event: any) => search(event)}
              >
                Buscar
              </Button>
              <Button
                variant="btn btn-danger btn"
                onClick={(event: any) => randomSearch()}
              >
                Me encontre!
              </Button>
            </Form>
          </Nav>
          <Nav className="ml-auto">
            <Button
              variant="btn btn-danger"
              onClick={(event: any) => favoriteBooks()}
            >
              <img src={BookMark} alt="star" />
              Favoritos
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
