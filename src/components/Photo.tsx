import React from 'react';
import styled from 'styled-components';
import { PhotoType } from '../context/Context';

interface OwnProps {
  photo: PhotoType
}

type Props = OwnProps;

const PhotoItem = styled.tr`
  td {
    height: 120px;
  }

  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #dddddd;
  }
`

const PhotoThumbnailImage = styled.img`
  height: 100%;
`

const Photo: React.FC<Props> = (props) => {
  const { id, title, thumbnailUrl, url } = props.photo;
  return (
    <PhotoItem>
      <td>{id}</td>
      <td>{title}</td>
      <td>{thumbnailUrl && title && <PhotoThumbnailImage src={thumbnailUrl} alt={title} />}</td>
    </PhotoItem>
  );
}

export default Photo
