import styled from 'styled-components';

const media = {
  paginationButtons4: '@media(max-width: 527px)',
  paginationButtons3: '@media(max-width: 360px)',
};

export const Container = styled.div``;

export const Pages = styled.ul`
  display: flex;
  padding: 8px 0 10px 20px;
  margin-top: 20px;

  ${media.paginationButtons4} {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
  }

  ${media.paginationButtons3} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    padding-right: 10px;
  }

  li {
    button {
      color: var(--white);
      background: #ff0000;
      margin-left: 30px;
      border: 0;
      border-radius: 8px;
      width: 40px;
      height: 40px;

      transition: transform 0.5s;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
`;
