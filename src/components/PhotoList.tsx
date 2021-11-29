import React, { useState } from 'react';
import styled from 'styled-components';
import Loading from './Loading';
import Photo from './Photo';
import Pagination from './Pagination';
import Modal from './Modal';
import { useGlobalContext, PhotoType } from '../context/Context';

const Table = styled.table`
  width: 100%;

  th,
  td {
    border: 1px solid var(--clr-grey-8);
    text-align: left;
    padding: 0.5rem 1rem;
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

const PhotoItem = styled.tr`
  td {
    height: 120px;
    cursor: pointer;
  }

  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #dddddd;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3.5rem;
  margin-top: 1rem;
`

const PhotoList: React.FC = () => {
  const { loading, photos, photosPerPage, paginatedData, isOpen, setIsOpen, paginate } = useGlobalContext();
  const [modalData, setModalData] = useState<PhotoType>();

  const handleClick = (photo: PhotoType) => {
    setIsOpen(true);
    setModalData(photo);
  }

  if (loading) return <Loading />;

  if (photos && photos?.length < 1) {
    return (
      <Title>No photos matched your search criteria</Title>
    )
  }

  return (
    <section className='section'>
      <h3 className="page-title"><span>{photos?.length}</span> photos</h3>
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
              return (
                <PhotoItem key={photo.id} onClick={() => handleClick(photo)}>
                  <Photo photo={photo} />
                </PhotoItem>
              );
            })}
        </tbody>
      </Table>
      <Pagination
        photosPerPage={photosPerPage}
        totalPhotos={photos && photos.length}
        pageNeighbours={1}
        paginate={paginate}
      />
      <Modal isOpen={isOpen} onClosed={() => setIsOpen(false)}>
        {modalData && 
          <img src={modalData.url} alt={modalData.title} />
        }
      </Modal>
    </section>
  );
}

export default PhotoList;
