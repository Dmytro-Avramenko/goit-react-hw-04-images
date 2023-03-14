import React, { useState } from 'react';
import PropTypes from "prop-types"
import s from './Searchbar.module.css';

function Searchbar({ getInputValue }) {
  const [input, setInput] = useState(''); 

  function search (evt) {
    evt.preventDefault();

    getInputValue(input);
    setInput('');
  };

  // можна записати просто setInput(evt.target.value) але з prevInput буде вірніше  
  function handleChange (evt) {
    setInput(prevInput => evt.target.value);
  };

  return (
      <header className={s.searchbar}>
      <form className={s.form}
        onSubmit={search}>
        
          <button type="submit" className={s.button}>
            <span className={s.label}>Search</span>
          </button>

          <input
            name="input"
            type="text"
            autoComplete="off"
            onChange={handleChange}
            value={input}
            autoFocus
            placeholder="Search images and photos"
            className={s.input}
          />
        </form>
      </header>
  );  
}

Searchbar.propTypes = {
  getInputValue: PropTypes.func
}

export default Searchbar

// код на класах/////////////////////////////////////////// 
// import PropTypes from "prop-types"
// import { Component } from 'react';
// import s from './Searchbar.module.css';

// export default class Searchbar extends Component {
//   state = {
//     input: '',
//   };

//   search = evt => {
//     evt.preventDefault();
//     this.props.getInputValue(this.state.input);
//     this.setState({ input: '' });
//   };

//   handleChange = evt => {
//     this.setState({ input: evt.target.value });
//   };

//   render() {
//     return (
//       <header className={s.searchbar}>
//         <form className={s.form} onSubmit={this.search}>
//           <button type="submit" className={s.button}>
//             <span className={s.label}>Search</span>
//           </button>

//           <input
//             name="input"
//             type="text"
//             autoComplete="off"
//             onChange={this.handleChange}
//             value={this.state.input}
//             autoFocus
//             placeholder="Search images and photos"
//             className={s.input}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// Searchbar.propTypes = {
//   getInputValue: PropTypes.func
// }

