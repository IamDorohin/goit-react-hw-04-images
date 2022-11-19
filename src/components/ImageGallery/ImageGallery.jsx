import PropTypes from 'prop-types';
import { GalleryList } from 'components/ImageGallery/ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ responseArray }) {
  return (
    <GalleryList>
      {responseArray.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            largeSrc={largeImageURL}
            alt={tags}
          />
        );
      })}
    </GalleryList>
  );
}

ImageGallery.propTypes = {
  responseArray: PropTypes.arrayOf(PropTypes.object),
};
