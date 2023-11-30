import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ getInputValue }) => {
  const [input, setInput] = useState('');

  const search = e => {
    e.preventDefault();
    getInputValue(input);
    setInput('');
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={search}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          name="input"
          type="text"
          autoComplete="off"
          onChange={handleChange}
          value={input}
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  getInputValue: PropTypes.func.isRequired,
};

export default Searchbar;
