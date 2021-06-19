import React, { FormEvent, useEffect } from "react";
import { useState } from "react";
import './styles.scss';

//Bootstrap
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Form, FormControl, Navbar, NavDropdown } from "react-bootstrap";

//Hooks, redux
import { useDispatch } from "react-redux";

//Api 
import api from "../../services/api";
import { env } from '../../env/env';

//img
import Logo from '../../assets/LOGO-LIVRO.png'; //adicionar star icon 

//Interface (types)
import { Book, BookState } from "../../store/ducks/books/types";
import { setBooks } from "../../store/ducks/books/actions";

const NavBar: React.FC = () => {

    const dispatch = useDispatch();

    const [bookSearch, setBookSearch] = useState<string>('');
    const [atualBooks, setAtualBooks] = useState<Book[]>([]);
    const [responseLenght, setResponseLenght] = useState<number>(0);

    console.log(bookSearch);
    //useEWffect
    const search = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); //prevenir comportamento padrão de recarregfar a pageina 
        console.log('dentro do search');
        if (bookSearch !==''){
            await api.get(`volumes?q=${bookSearch}&key=${env.GOOGLE_API_KEY}&maxResults=40`)
            .then( response => {
                setAtualBooks(response.data.items);
                setResponseLenght(response.data.totalItems);

                console.log('RESPONSE ADAS: ', response.data.items)
                
                //TODO: i need to know if this is working correctly, search! NEED TIME TO SHOW LOGS.
                
                updateBookList(response.data.items, response.data.totalItems);
                
                
            }).catch(err =>{
                console.log(err);
            });       
    
        }
        console.log('fora do if');
    }

    function updateBookList(book: Book[], totalItems: number ) {
        
        return dispatch(setBooks({
            book: book,
            length: totalItems,
        }));
        
    }



    const teste = () => {
        console.log(atualBooks);
        console.log(responseLenght);
    }

    return(
        <>       
            <Navbar bg="light" expand="lg">
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Form inline>
                    <FormControl 
                        type="text" 
                        placeholder="Comece por aqui"
                        className="mr-sm-2"
                        onSubmit={(event: any)  => search(event)}
                        onChange={(event) => setBookSearch(event.target.value)} 

                        />
                    <Button 
                        variant="btn btn-danger"
                        onClick={(event: any)  => search(event)}
                        >
                        Buscar
                    </Button>
                    </Form>
                </Nav>
                <Nav className="ml-auto">
                    <Button 
                        variant="btn btn-danger"
                        onClick={teste} //colocar event
                    >
                        <img src="{Logo}" alt=" " /> 
                        Favoritos
                    </Button>                   
                </Nav>
            </Navbar.Collapse>
            </Navbar>            
        </>
    )

}

export default NavBar;


