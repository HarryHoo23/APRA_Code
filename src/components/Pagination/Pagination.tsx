import React, { useState } from 'react';
import styled from 'styled-components';
import { fetchPageNumbers } from '../../hooks/GetPagination';

const PaginationList = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
  padding-left: 0;
  list-style: none;

  li:first-child a {
    margin-left: 0;
  }

  .active button {
    background-color: #cccccc;
  }

  button {
    position: relative;
    display: block;
    cursor: pointer;
    padding: 0.5rem 0.75rem;
    margin-left: 0.5rem;
    line-height: 1.25;
    color: #2d2d2d;
    background-color: #fff;
    border: 1px solid #dee2e6;
    text-decoration: none;
    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const PaginationNav = styled.nav`
  display: flex;
  justify-content: space-between;

  .page-container {
    margin-top: 2rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`

interface PaginationProps {
  photosPerPage: number;
  totalPhotos: number | null;
  pageNeighbours: number;
  paginate: (pageNumber: number) => void;
}

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const Pagination: React.FC<PaginationProps> = ({
  photosPerPage,
  totalPhotos,
  pageNeighbours,
  paginate,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  let pageNeighbour = Math.max(0, Math.min(pageNeighbours, 2));
  const totalPage = totalPhotos ? Math.ceil(totalPhotos / photosPerPage) : 0;

  const gotoPage = (page: number) => {
    paginate(page);
    setCurrentPage(Math.max(0, Math.min(page, totalPage)));
  };

  const handleMoveLeft = () => {
    gotoPage(currentPage - pageNeighbour * 2 - 1);
  };

  const handleMoveRight = () => {
    gotoPage(currentPage + pageNeighbour * 2 + 1);
  };

  const pages = fetchPageNumbers(totalPage, currentPage, pageNeighbour);

  return (
    <PaginationNav>
      <div className='page-container'>
        Page <span>{currentPage}</span> / <span>{totalPage}</span>
      </div>
      <PaginationList>
        {pages.map((page, index) => {
          if (page === LEFT_PAGE) {
            return (
              <li key={index}>
                <button onClick={handleMoveLeft}>&laquo;</button>
              </li>
            );
          }

          if (page === RIGHT_PAGE) {
            return (
              <li key={index}>
                <button onClick={handleMoveRight}>&raquo;</button>
              </li>
            );
          }

          return (
            <li
              key={index}
              className={`${currentPage === page ? 'active' : ''}`}
            >
              <button onClick={() => gotoPage(page)}>{page}</button>
            </li>
          );
        })}
      </PaginationList>
    </PaginationNav>
  );
};

export default Pagination;
