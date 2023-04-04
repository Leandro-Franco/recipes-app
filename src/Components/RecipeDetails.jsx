// import { useParams } from 'react-router-dom';
// import { useEffect, useContext } from 'react';
// import ContextData from '../Contexts/ContextData';

function RecipeDetails() {
  return (
    <div>
      <h1>{recipe.strMeal || recipe.strDrink}</h1>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
      />
      <p>{recipe.strInstructions}</p>
    </div>
  );
}

export default RecipeDetails;
