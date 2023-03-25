import React, { useState, useEffect } from 'react';
// import 'react-toastify/dist/ReactToastify.css';

import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import * as message from './notification';
import { getImages } from './Api';
import { Loader } from './Loader/Loader';

export function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [selectImage, setSelectImage] = useState(null);

  const maxPage = Math.ceil(totalImages / 12);
  const showButton = images.length > 0 && page < maxPage;

  useEffect(() => {
    if (search === '') {
      return;
    }

    async function newSearchRequestServer() {
      try {
        const response = await getImages({ search, page });
        const totalImages = response.data.totalHits;
        const images = response.data.hits;

        if (totalImages === 0 || images === '') {
          return message.notificationError();
        }
        if (page === 1) {
          message.notificationSuccess(totalImages);
        }
        setImages(prevState => [...prevState, ...images]);
        setTotalImages(totalImages);
      } catch (error) {        
        message.notificationServerError();
      } finally {
        setLoading(false);
      }
    }
    setLoading(true);
    newSearchRequestServer();
    return () => {      
    };
  }, [search, page]);

  function trackingSearchQuery(evt) {
    evt.preventDefault();

    const form = evt.currentTarget;
    const searchValue = form.elements.search.value;

    if (searchValue.trim() === '') {
      return message.notificationInfo();
    }
    setPage(1);
    setImages([]);
    setSearch(searchValue);
    form.reset();
  }

  function loadMoreImages() {
    setPage(prevState => prevState + 1);    
  }

  function openModal(evt) {
    const imageInfo = { alt: evt.target.alt, url: evt.currentTarget.dataset.large };
    setSelectImage(imageInfo);
  }

  function closeModal() {
    setSelectImage(null);
  }  

  return (
    <>
      <Searchbar onSubmit={trackingSearchQuery} />
      <ImageGallery>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} onClick={openModal} />
        ))}
      </ImageGallery>
      {loading && <Loader />}
      {showButton && <Button onClick={loadMoreImages} />}
      {selectImage && <Modal onClose={closeModal} image={selectImage} />}
    </>
  );
}

export default App