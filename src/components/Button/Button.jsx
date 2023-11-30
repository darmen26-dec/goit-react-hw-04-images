import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ nextPage, hasMoreImages }) =>
  hasMoreImages && (
    <button type="button" className={css.button} onClick={nextPage}>
      Load more
    </button>
  );

Button.propTypes = {
  nextPage: PropTypes.func.isRequired,
  hasMoreImages: PropTypes.bool.isRequired,
};

export default Button;
