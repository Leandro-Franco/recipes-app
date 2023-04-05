import React, { useContext } from 'react';

function IngredientList() {
  const { ingredients } = useContext(ContextData);
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

export default IngredientList;
