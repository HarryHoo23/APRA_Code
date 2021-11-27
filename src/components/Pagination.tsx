import React, { useState } from 'react';
import styled from 'styled-components';
import { fetchPageNumbers } from '../GetPagination';

const PaginationList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  max-width: 100%;
  list-style: none;

  li:first-child a {
    margin-left: 0;
  }

  .active a {
    background-color: #cccccc;
  }

  a {
    position: relative;
    display: block;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
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

interface PaginationProps {
  photosPerPage: number;
  totalPhotos: number | null;
  pageNeighbours: number;
  paginate: (pageNumber: number) => void;
}

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";


const Pagination: React.FC<PaginationProps> = ({ photosPerPage, totalPhotos, pageNeighbours, paginate }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  let pageNeighbour = Math.max(0, Math.min(pageNeighbours, 2));
  const totalPage = totalPhotos ? Math.ceil(totalPhotos / photosPerPage) : 0;
  
  const gotoPage = (page: number) => {
    paginate(page);
    setCurrentPage(Math.max(0, Math.min(page, totalPage)));
  }
  
  const handleMoveLeft = () => {
    gotoPage(currentPage - pageNeighbour * 2 - 1);
  }

  const handleMoveRight = () => {
    gotoPage(currentPage + pageNeighbour * 2 + 1);
  };
  
  const pages = fetchPageNumbers(totalPage, currentPage, pageNeighbour);


  return (
    <nav>
      <PaginationList>
        {pages.map((page, index) => {
          if (page === LEFT_PAGE) {
            return (
              <li key={index}>
                <a onClick={handleMoveLeft}>&laquo;</a>
              </li>
            );
          }

          if (page === RIGHT_PAGE) {
            return (
              <li key={index}>
                <a onClick={handleMoveRight}>&raquo;</a>
              </li>
            );
          }

          return (
            <li key={index} className={`${currentPage === page ? "active" : ""}`}>
              <a onClick={() => gotoPage(page)}>
                {page}
              </a>
            </li>
          )
        })}
      </PaginationList>
    </nav>
  );
}

export default Pagination;
