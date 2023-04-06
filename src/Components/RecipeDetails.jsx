import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useFilter } from '../Contexts/ProviderFilter';
import './recipes.css';

function RecipeDetails() {
  const history = useHistory();
  const { detailRecipes, setRecipeId } = useFilter();
  const [ingredients, setIngredients] = useState();
  const { id } = useParams();
  const { pathname } = history.location;

  useEffect(() => {
    const defaultLoad = (recipeId, path) => {
      if (path === '/meals') {
        setRecipeId({ id: recipeId, type: 'Meal' });
      } else { setRecipeId({ id: recipeId, type: 'Drink' }); }
    };

    const paths = ['/meals', '/drinks'];
    const regex = new RegExp(`(${paths.join('|')})/\\d+$`);
    const actualPath = pathname.replace(regex, (match, group) => group);

    defaultLoad(id, actualPath);
  }, []);

  useEffect(() => {
    const firstIngredient = 9;
    const lastIngredient = 29;

    console.log(detailRecipes);

    if (detailRecipes) {
      const filteredIngredients = Object.values(detailRecipes)
        .slice(firstIngredient, lastIngredient)
        .filter((empty) => empty);

      setIngredients(filteredIngredients);
    }
  }, [detailRecipes]);

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
    <section className="details">
      <article className="details-img-bg">
        <img
          src={ strMealThumb || strDrinkThumb }
          alt={ strMeal || strDrink }
          data-testid="recipe-photo"
          className="details-img"
        />
      </article>

      <header className="details-header">
        <p data-testid="recipe-category" className="details-category">
          {strCategory}
        </p>
      </header>

      <h1 className="details-title" data-testid="recipe-title">
        {strMeal || strDrink}
      </h1>

      <fieldset>
        <legend>Ingredients</legend>
        <ul data-testid="index-ingredient-name-and-measure">
          { ingredients?.map((ingredient, idx) => (
            <li key={ idx }>{ ingredient }</li>
          ))}
        </ul>
      </fieldset>

      <fieldset>
        <legend>Instructions</legend>
        <p data-testid="instructions">
          { strInstructions }
        </p>
      </fieldset>

      <video
        controls
        data-testid="video"
      >
        <source src={ `${strYoutube}` } />
        <track kind="captions" />
      </video>
    </section>
  );
}

export default RecipeDetails;
