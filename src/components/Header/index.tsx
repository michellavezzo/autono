import React from 'react';
import './styles.scss';

//IMG
import Logo from '../../assets/LOGO-LIVRO.png';

const Header: React.FC = () => {
    return(
        <div className = 'container-logo'>
            <div className ='logo'>
                <img 
                    src={Logo} 
                    alt="Logo"
                />
            </div>
            <div className='container-title'>
                <h1>LIVR'AQUI</h1>
                <p>ENCONTRE LIVROS, OU DEIXE-OS TE ENCONTRAR</p>
            </div>



        </div>
    )
}

export default Header;