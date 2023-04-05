import React from 'react';
import PropTypes from 'prop-types';

function IngredientList({ ingredients }) {
  return (
    <ul>
      {ingredients.map((ingredient, index) => (
        <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          { `${ingredient.name} - ${ingredient.measure}` }
        </li>
      ))}
    </ul>
  );
}

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      measure: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default IngredientList;
