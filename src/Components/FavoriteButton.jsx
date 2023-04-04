import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ isFavorite, onClick }) {
  return (
    <button type="button" onClick={ onClick } data-testid="favorite-btn">
      {isFavorite ? blackHeartIcon : whiteHeartIcon }
    </button>
  );
}

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FavoriteButton;
