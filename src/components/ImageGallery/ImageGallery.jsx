import PropTypes from "prop-types"
import s from './ImageGallery.module.css';

export function ImageGallery({ children }) {
  return <ul className={s.gallery}>{children}</ul>;
}
ImageGallery.propTypes = {
  children: PropTypes.array
}