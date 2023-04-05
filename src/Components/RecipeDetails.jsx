import { useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import context from '../Contexts/ProviderData';

function RecipeDetails() {
  const { id, type } = useParams();
  const { detailRecipes, fetchRecipeDetails } = useContext(context);

  useEffect(() => {
    fetchRecipeDetails(id, type);
  }, [fetchRecipeDetails, id, type]);

  console.log(detailRecipes);

  if (!detailRecipes.detail) {
    return <div>Loading...</div>;
  }

  const {
    strMealThumb,
    strDrinkThumb,
    strMeal,
    strDrink,
    strCategory,
    strInstructions,
    strYoutube,
  } = detailRecipes.detail;

  return (
    <div>
      <img
        src={ strMealThumb || strDrinkThumb }
        alt={ strMeal || strDrink }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        {strMeal || strDrink}
      </h1>
      <p data-testid="recipe-category">
        {strCategory}
      </p>
      <p data-testid="index-ingredient-name-and-measure">
        Ingredientes
      </p>
      <p data-testid="instructions">
        {strInstructions}
      </p>
      <video
        controls
        data-testid="video"
      >
        <source src={ `${strYoutube}` } />
        <track kind="captions" />
      </video>
    </div>
  );
}

export default RecipeDetails;
