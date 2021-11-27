import React from 'react';
import styled from 'styled-components';
import Photo from './Photo';
import Pagination from './Pagination';
import { useGlobalContext } from '../context/Context';

const Table = styled.table`
  width: 100%;

  th,
  td {
    border: 1px solid var(--clr-grey-8);
    text-align: left;
    padding: 1rem 0.5rem;
  }

  thead tr th:nth-child(1) {
    width: 10%;
  }

  thead tr th:nth-child(2) {
    width: 40%;
  }

  thead tr th:nth-child(3) {
    width: 50%;
  }
`;

const PhotoList: React.FC = () => {
  const { loading, photos, photosPerPage, paginatedData, paginate } = useGlobalContext();
  
  return (
    <section className='section'>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData &&
            paginatedData.map((photo) => {
              return <Photo key={photo.id} photo={photo} />;
            })}
        </tbody>
      </Table>
      <Pagination
        photosPerPage={photosPerPage}
        totalPhotos={photos && photos.length}
        pageNeighbours={1}
        paginate={paginate}
      />
    </section>
  );
}

export default PhotoList;
