import { useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import ContextData from '../Contexts/ContextData';

function RecipeDetails() {
  const { id, type } = useParams();
  const { detailRecipes, fetchRecipeDetails } = useContext(ContextData);

  useEffect(() => {
    fetchRecipeDetails(id, type);
  }, [fetchRecipeDetails, id, type]);

  console.log(detailRecipes);

  return (
    <div>
      {detailRecipes ? (
        <>
          <img
            src={ detailRecipes.strMealThumb || detailRecipes.strDrinkThumb }
            alt={ detailRecipes.strMeal || detailRecipes.strDrink }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">
            {detailRecipes.strMeal || detailRecipes.strDrink}
          </h1>
          <p data-testid="recipe-category">
            {detailRecipes.strCategory}
          </p>
          <p data-testid={ `${index}-ingredient-name-and-measure` }>
            Ingredientes
          </p>
          <p data-testid="instructions">
            {detailRecipes.strInstructions}
          </p>
          <video
            controls
            data-testid="video"
          >
            <source src={ `${detailRecipes.strYoutube}` } />
            <track kind="captions" />
          </video>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default RecipeDetails;
