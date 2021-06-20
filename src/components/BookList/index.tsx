import React, { useState } from "react";
import './styles.scss';

//Bootstrap
import Pagination from 'react-bootstrap/Pagination';
// pesquisar componente que gira enquanto carrega

//Api 
import api from "../../services/api";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Book } from "../../store/ducks/books/types";
import { ApplicationState } from "../../store";
import { useEffect } from "react";

//IMG
import Logo from '../../assets/LOGO-LIVRO.png';

const Booklist: React.FC = () => {
    const dispatch = useDispatch();
    const books = useSelector((state: ApplicationState) => state.books);
    
    const [atualBooks, setAtualBooks] = useState<Book[]>([]);

    useEffect(() => {
        setAtualBooks(books.book);
    },[books]);

    //const teste = atualBooks.map(books => books.id).toString();
    //const teste = atualBooks;
    
    console.log('BOOKS', books);

    return(
        <>
            <div className="booklist">
            <h1>Livros sobre: {books.searchTerm}</h1>
            <ul>
            {books.book && books.book.length && books.book.map((book) => (
                <li>
                    <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : Logo } alt={book.volumeInfo.title} />
                    {book.volumeInfo.title}
                    
                </li>
            ))}
            </ul>
            </div>
        </>
    )
}

export default Booklist;