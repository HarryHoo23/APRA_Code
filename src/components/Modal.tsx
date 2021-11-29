import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean,
  onClosed: () => void,
  children: React.ReactNode
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.6);
  z-index: 9999;
`

const PhotoModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--clr-white);
  padding: 3rem 2rem 2rem;
  z-index: 9999;

  @media (max-width: 1200px) {
    width: 80%;
  }

  button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

const Modal: React.FC<ModalProps> = ({isOpen, onClosed, children}) => {

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <Overlay />
      <PhotoModal>
        <button className='btn close-btn' onClick={onClosed}>
          X
        </button>
        {children}
      </PhotoModal>
    </>,
    document.getElementById('portal') as HTMLElement
  )
}

export default Modal
