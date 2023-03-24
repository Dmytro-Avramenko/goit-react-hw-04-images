import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export function Modal({ onClose, image }) {
  const { url, alt } = image;

  useEffect(() => {
    function clickEsc(evt) {
      if (evt.code === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', clickEsc);

    return () => {
      window.removeEventListener('keydown', clickEsc);
    };
  }, [onClose]);

  function clickBackdrop(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={s.overlay} onClick={clickBackdrop}>
      <div className={s.modal}>
        <img src={url} alt={alt} />
      </div>
    </div>
  )
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
};

export default Modal