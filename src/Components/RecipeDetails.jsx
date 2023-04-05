import { useFilter } from '../Contexts/ProviderFilter';
import './recipes.css';

function RecipeDetails() {
  const { detailRecipes } = useFilter();

  console.log(detailRecipes);

  if (!detailRecipes) {
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
  } = detailRecipes;

  return (
    <div>
      <div>
        <img
          src={ strMealThumb || strDrinkThumb }
          alt={ strMeal || strDrink }
          data-testid="recipe-photo"
          className="detail-img"
        />
        <h1 data-testid="recipe-title">
          {strMeal || strDrink}
        </h1>
        <p data-testid="recipe-category">
          {strCategory}
        </p>
      </div>
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
