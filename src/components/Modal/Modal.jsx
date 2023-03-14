import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

function Modal({ url, onClose }) {
    // const [state, setState] = useState({});
    
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
                <img src={url} alt="" />
            </div>
        </div>
    )    
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
}

export default Modal




// код на класах ////////////////////////////////////
// import { Component } from 'react';
// import PropTypes from 'prop-types';
// import s from './Modal.module.css';

// export default class Modal extends Component {
//     state = {}

//     componentDidMount() {
//         window.addEventListener('keydown', this.clickEsc);
//     }
//     componentWillUnmount() {
//         window.removeEventListener('keydown', this.clickEsc);
//     }

//     clickBackdrop = event => {
//         if (event.target === event.currentTarget) {
//             this.props.onClose();
//         }
//     }

//     clickEsc = event => {
//         if (event.code === 'Escape') {
//             this.props.onClose();
//         }
//     }

//     render() {
//         return (
//             <div className={s.overlay} onClick={this.clickBackdrop}>
//                 <div className={s.modal}>
//                     <img src={this.props.url} alt="" />
//                 </div>
//             </div>
//         )
//     }
// }
// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   url: PropTypes.string.isRequired,
// }
