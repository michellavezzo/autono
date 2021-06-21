import React, { useState } from 'react';
import './styles.scss';

//Bootstrap
import Pagination from 'react-bootstrap/Pagination';
// pesquisar componente que gira enquanto carrega

//Api
import api from '../../services/api';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Book } from '../../store/ducks/books/types';
import { ApplicationState } from '../../store';
import { useEffect } from 'react';

//IMG
import Logo from '../../assets/LOGO-LIVRO.png';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { Container } from 'react-dom';

type Props = {
  book: Book;
  show: boolean;
  onHide: () => void;
};

const ModalBook: React.FC<Props> = ({ book, show, onHide }) => {
  //const dispatch = useDispatch();
  //const books = useSelector((state: ApplicationState) => state.books);
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {book.volumeInfo.title}
          <h6>{book.volumeInfo.subtitle}</h6>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="left">
          <img
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
          />
          <div className="bookInfo">
            Descrição:
            <h6>{book.volumeInfo.description}</h6>
            Autor:
            <h6>{book.volumeInfo.authors}</h6>
            Editora:
            <h6>{book.volumeInfo.publisher}</h6>
          </div>
        </div>
        <div className="right"></div>
      </Modal.Body>

      <Modal.Footer>
        {/* <Button variant="secondary">Close</Button> posso usar href qq coisa
        <Button variant="primary">Save changes</Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBook;
