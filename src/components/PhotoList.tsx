import React from 'react';
import styled from 'styled-components';
import Photo from './Photo';
import { useGlobalContext } from '../context/Context';

const Table = styled.table`
  width: 100%;

  th,
  td {
    border: 1px solid var(--clr-grey-8);
    text-align: left;
    padding: 1rem 0.5rem;
  }
`;


const PhotoList: React.FC = () => {
  const { loading, photos } = useGlobalContext();
  
  return (
    <section className="section">
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {photos && photos.map((photo) => {
            return <Photo key={photo.id} photo={photo} />
          })}      
        </tbody>
      </Table>
    </section>
  )
}

export default PhotoList;
