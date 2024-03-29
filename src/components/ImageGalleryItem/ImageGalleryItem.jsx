import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ image, onClick }) {
  return (
    <>
      <li className={s.item}>
        <img id={image.id} src={image.webformatURL} alt={image.tags} data-large={image.largeImageURL} onClick={onClick} />
      </li>
    </>    
  );
}

ImageGalleryItem.prototype = {
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem