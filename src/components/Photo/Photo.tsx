import React from 'react';
import styled from 'styled-components';
import { PhotoType } from '../../context/Context';

interface OwnProps {
  photo: PhotoType,
}

type Props = OwnProps;

const PhotoThumbnailImage = styled.img`
  height: 100%;
`

const Photo: React.FC<Props> = (props) => {
  const { id, title, thumbnailUrl } = props.photo;
  return (
    <React.Fragment>
      <td>{id}</td>
      <td>{title}</td>
      <td>{thumbnailUrl && title && <PhotoThumbnailImage src={thumbnailUrl} alt={title} />}</td>
    </React.Fragment>
  );
}

export default Photo
