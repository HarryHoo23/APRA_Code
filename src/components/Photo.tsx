import React from 'react';
import styled from 'styled-components';
import { PhotoType } from '../context/Context';

interface OwnProps {
  photo: PhotoType
}

type Props = OwnProps;

const PhotoItem = styled.tr`
  padding: 1rem 0;
`

const Photo: React.FC<Props> = (props) => {
  const { id, title, thumbnailUrl, url } = props.photo;
  return (
    <PhotoItem>
      <td>{id}</td>
      <td>{title}</td>
      <td>{thumbnailUrl}</td>
    </PhotoItem>
  );
}

export default Photo
