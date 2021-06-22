import React from 'react';
import './styles.scss';

//Bootstrap

//Api
import api from '../../services/api';

const Footer: React.FC = () => {
  return (
    <>
      <div className="footer-line" />
      <div className="footer-container">
        <h3>Sobre Mim: </h3>
        <div className="left">
          <img
            src="https://avatars.githubusercontent.com/u/38358577?v=4"
            alt="developer-picture"
          />
          <div className="developer-info">
            <h4>Michel R. B. Lavezzo</h4>
            <h6>michellavezzo@gmail.com</h6>
            <a href="https://github.com/michellavezzo/autono">
              <h6>Github</h6>
            </a>
            <a href="https://www.linkedin.com/in/michel-lavezzo-0a374b1ab/">
              <h6>Linkedin</h6>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
