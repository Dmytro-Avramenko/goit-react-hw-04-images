import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import getImages from '../Api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

function ImageGallery({ inputName, loadMoreBtn, onClick, page }) {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const fetchLoad = async () => {
      try {
        setStatus('pending');
        const response = await getImages(inputName, page);
        setImages(response.hits);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
      }
    };
      if (inputName && page > 0) {
      fetchLoad();
    }
  }, [inputName, page]);

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolved') {
    return (
      <>
        <ul className={s.gallery}>
          {images.map(({ id, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              url={largeImageURL}
              tags={tags}
              onClick={onClick}
            />
          ))}
        </ul>

        {images.length !== 0 ? (
            <Button onClick={loadMoreBtn} />
          ) : ( alert('No results')
          )}
      </>
    );
  }  
}

ImageGallery.propTypes = {
  inputName: PropTypes.string.isRequired,
  loadMoreBtn: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default ImageGallery;






// код на класах
// import { Component } from 'react';
// import PropTypes from 'prop-types';
// import s from './ImageGallery.module.css';
// import getImages from '../Api';
// import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
// import Loader from '../Loader/Loader';
// import Button from '../Button/Button';

// export default class ImageGallery extends Component {
//   state = {
//     images: [],
//     status: 'idle',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.inputName !== this.props.inputName) {
//       this.fetchLoad();
//     }
//     if (prevProps.page !== this.props.page && this.props.page > 1) {
//       this.fetchLoadMore();
//     }
//   }

//   // отримуємо пропсами просто зображення з Api і записуємо їх в стейт 
//   fetchLoad = () => {
//     getImages(this.props.inputName, this.props.page)
//       .then(response => {
//         this.setState({
//           images: response.hits,
//           status: 'resolve',
//         });
//       })
//       .catch(error => this.setState({ status: 'rejected' }));
//   };

//   // додаємо(розпиляємо) до існуючого масиву з 12 зображень за пошуком настпні 12
//   fetchLoadMore = () => {
//     getImages(this.props.inputName, this.props.page)
//       .then(response => {
//         this.setState(prevState => ({
//           images: [...prevState.images, ...response.hits],
//           status: 'resolve',
//         }));
//       })
//       .catch(error => this.setState({ status: 'rejected' }));
//   };

//   render() {
//     if (this.state.status === 'pending') {
//       return <Loader />;
//     }

//     if (this.state.status === 'resolve') {
//       return (
        // <>
        //   <ul className={s.gallery}>            
        //     {this.state.images.map(({ id, largeImageURL, tags }) => (
        //       <ImageGalleryItem
        //         key={id}
        //         url={largeImageURL}
        //         tags={tags}
        //         onClick={this.props.onClick}
        //       />
        //     ))}
        //   </ul>

          // {this.state.images.length !== 0 ? (
          //   <Button onClick={this.props.loadMoreBtn} />
          // ) : ( alert('No results')
          // )}
        // </>
//       );
//     }
//   }
// }

// ImageGallery.propTypes = {
//   inputName: PropTypes.string.isRequired,
//   loadMoreBtn: PropTypes.func.isRequired,
//   onClick: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
// }