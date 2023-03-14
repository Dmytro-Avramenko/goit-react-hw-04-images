import React, { useState, useEffect } from 'react';
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";

export default function App() {
  const [inputName, setInputName] = useState('');
  const [modalImg, setModalImg] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);


  const getInputValue = handleValue => {
    setInputName(handleValue);
    setPage(1);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal )
  }

  const getLargeImg = (url) => {
    toggleModal();
    setModalImg(url);
  }

  const loadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [page]);
  
  return (
    <>
      <Searchbar getInputValue={getInputValue}/>
      <ImageGallery
        inputName={inputName}
        onClick={getLargeImg}
        loadMoreBtn={loadMoreBtn}
        page={page} />
      {showModal && <Modal url={modalImg} onClose={toggleModal} />}
    </>
  )  
}



// код на класах
// import React, { Component } from 'react';
// import ImageGallery from "./ImageGallery/ImageGallery";
// import Modal from "./Modal/Modal";
// import Searchbar from "./Searchbar/Searchbar";

// export default class App extends Component {

//   state = {
//     inputName: '',
//     modalImg: '',
//     page: 1,
//     showModal: false,
//   }

//   getInputValue = handleValue => {
//     this.setState({ inputName: handleValue, page: 1 })
//   }

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }))
//   }

//   getLargeImg = url => {
//     this.toggleModal();
//     this.setState({ modalImg: url });
//   }

//   loadMoreBtn = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     return (
//       <>
//         <Searchbar getInputValue={this.getInputValue}/>
//         <ImageGallery inputName={this.state.inputName}
//           onClick={this.getLargeImg}
//           loadMoreBtn={this.loadMoreBtn}
//           page={this.state.page} />
//         {this.state.showModal && <Modal url={this.state.modalImg} onClose={this.toggleModal} />}
//       </>
//     )
//   }
// }
