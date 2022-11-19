import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ src, largeSrc, alt }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <GalleryItem>
      <GalleryImage src={src} alt={alt} onClick={toggleModal} />
      {showModal && <Modal src={largeSrc} alt={alt} onClose={toggleModal} />}
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeSrc: PropTypes.string.isRequired,
};
