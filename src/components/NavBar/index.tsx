import React from "react";
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
import { useState } from "react";

const NavBar: React.FC = () => {

    const dispacth = useDispatch();

    const [bookSearch, setBookSearch] = useState<string>('');
    console.log(bookSearch);
    
    const search = async () => {
        console.log('dentro do search');
        if (bookSearch !==''){
            console.log('dentro do if');
            const response =await api.get(`volumes?q=${bookSearch}&key=${env.GOOGLE_API_KEY}`);

            console.log(response);
        }
        console.log('fora do if');
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
                        value={bookSearch}
                        onChange={(event:any) => setBookSearch(event.target.value)} 
                        />
                    <Button 
                        variant="btn btn-danger"
                        onClick={search}
                        >
                        Buscar
                    </Button>
                    </Form>
                </Nav>
                <Nav className="ml-auto">
                    <Button 
                        variant="btn btn-danger"
                        //onClick={search}
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


