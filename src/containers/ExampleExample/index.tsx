import React from 'react';

import Example from '../../components/Example';
import Header from '../../components/Header';
import Navbar from '../../components/NavBar';
import BookList from '../../components/BookList';
import Footer from '../../components/Footer';

const ExampleExample: React.FC = () => {
  return (
    <>
      <Header />
      <Navbar/>
      <BookList/>
      <Footer/>     
    </>
  );

  
}

export default ExampleExample;