import React from 'react';
//
import './styles.ts';

//Bootstrap
import Pagination from 'react-bootstrap/Pagination';
import { Pages, Container } from './styles';

interface IPaginateProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (params: number) => void;
}

const MyPagination: React.FC<IPaginateProps> = ({
  postsPerPage,
  totalPosts,
  paginate,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // let active = currentPage;
  // let items = [];
  // for (let number = 1; number <= 5; number++) {
  //   items.push(
  //     <Pagination.Item key={number} active={number === active}>
  //       {number}
  //     </Pagination.Item>,
  //   );
  // }

  return (
    <Container>
      <Pages className="pagination">
        {pageNumbers.map(number => (
          <li key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </Pages>
    </Container>
  );
};

export default MyPagination;
