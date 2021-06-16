import React from "react";
import './styles.scss';

//Bootstrap
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

//Api 
import api from "../../services/api";
import { Form, FormControl, Navbar, NavDropdown } from "react-bootstrap";

//img
import Logo from '../../assets/LOGO-LIVRO.png'; //adicionar star icon 

const NavBar: React.FC = () => {


    return(
        <>       
            <Navbar bg="light" expand="lg">
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Form inline>
                    <FormControl type="text" placeholder="Comece por aqui" className="mr-sm-2" />
                    <Button variant="btn btn-danger">Buscar</Button>
                    </Form>
                </Nav>
                <Nav className="ml-auto">
                    <Button variant="btn btn-danger">
                        <img src="{Logo}" alt=" " /> 
                        <a>Favoritos</a>
                    </Button>                   
                </Nav>
            </Navbar.Collapse>
            </Navbar>            
        </>
    )

}

export default NavBar;


