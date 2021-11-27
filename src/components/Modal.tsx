import React, { Children } from 'react';
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
  background-color: #ffffff;
  padding: 3rem;
  width: 80vw;
  height: 80vw;
  z-index: 9999;

  button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  img {
    width: 100%;
    height: auto;
  }
`

const Modal: React.FC<ModalProps> = ({isOpen, onClosed, children}) => {

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <Overlay />
      <PhotoModal>
        <button className='btn' onClick={onClosed}>
          x
        </button>
        {children}
      </PhotoModal>
    </>,
    document.getElementById('portal') as HTMLElement
  )
}

export default Modal
