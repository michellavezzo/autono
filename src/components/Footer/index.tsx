import React from "react";
import './styles.scss';

//Bootstrap


//Api 
import api from "../../services/api";

const Footer: React.FC = () => {
    return(
        <>
            <div className='footer-line'/>
            <div className="footer-container">
                <h4>Sobre Mim: </h4>
                <div className='left'>
                    <img 
                        src ='https://avatars.githubusercontent.com/u/38358577?v=4'
                        alt='developer-picture'
                        />
                    <div className='developer-info'>
                        <h4>Michel R. B. Lavezzo</h4>
                        <h6>michellavezzo@gmail.com</h6>
                        <h6>github(img link)</h6>    
                        <h6>linkedin(img link)</h6>        

                </div>

                </div>


            </div>
        
        </>
    )
}

export default Footer;