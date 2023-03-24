// import React, { useState } from 'react';
import PropTypes from "prop-types"
import s from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={onSubmit}>
        <button
          type="submit" className={s.button}>
        </button>

        <input
          name="search"
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.prototype = {
  onSubmit: PropTypes.func.isRequired
};