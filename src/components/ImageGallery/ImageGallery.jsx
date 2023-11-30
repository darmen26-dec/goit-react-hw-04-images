import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const imagePropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
});

export const ImageGallery = ({ images, openImageModal }) => {
  return (
    <ul className={css.imageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          openImageModal={openImageModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  openImageModal: PropTypes.func,
  images: PropTypes.arrayOf(imagePropType).isRequired,
};
