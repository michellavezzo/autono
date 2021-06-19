import React, { useState } from "react";
import './styles.scss';

//Bootstrap
import Pagination from 'react-bootstrap/Pagination';

//Api 
import api from "../../services/api";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Book } from "../../store/ducks/books/types";
import { ApplicationState } from "../../store";
import { useEffect } from "react";

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
            <h1>list de books</h1>
            <ul>
            {books.book && books.book.length && books.book.map((book) => (
                <li>
                    {book.volumeInfo.title}
                </li>
            ))}
            </ul>
            </div>
        
        </>
    )
}

export default Booklist;