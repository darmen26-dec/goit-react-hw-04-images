import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  openImageModal,
}) => (
  <li className={css.imageGalleryItem}>
    <img
      onClick={() => openImageModal(largeImageURL)}
      className={css.imageGalleryItemImage}
      src={webformatURL}
      alt={tags}
      largeimage={largeImageURL}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  openImageModal: PropTypes.func,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
