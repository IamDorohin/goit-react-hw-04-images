import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ src, alt, onClose }) => {
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) onClose();
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={src} alt={alt} />
      </ModalWindow>
    </Backdrop>,
    modalRoot
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
