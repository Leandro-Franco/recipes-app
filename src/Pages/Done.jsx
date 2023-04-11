import { useState, useEffect } from 'react';
// import { useParams, useHistory, useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import { LsDone } from '../Services/localStorageFuncs';
import ShareButton from '../Components/ShareButton';
// import { useFilter } from '../Contexts/ProviderFilter';

function DoneRecipes() {
  const [recipesDone, setDoneRecipes] = useState();
  // const { pathname } = useLocation();
  // const { id } = useParams();
  // const history = useHistory();
  // const { setRecipeId } = useFilter();
  // const type = pathname.includes('drinks') ? 'drinks' : 'meals';

  useEffect(() => {
    console.log(true);
    const getRecipe = () => {
      const recipe = LsDone();
      setDoneRecipes(recipe);
    };
    // setRecipeId(0);
    getRecipe();
  }, []);
  console.log(recipesDone);

  return (
    <>
      <Header title="Done Recipes" />
      <h1>Receitas feitas</h1>
      <section>
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
      </section>
      <section
        className="recipes-grid"
        data-testid="recipes-grid"
      >
        { recipesDone?.map((recipe, index) => (
          <article
            key={ index }
            data-testid={ `${index}-recipe-card` }
            // className="recipes-card"
            aria-hidden="true"
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              alt={ recipe.name }
              src={ recipe.image }
              className="card-img"
            />
            <h4
              data-testid={ `${index}-horizontal-top-text` }
              className="card-text"
            >
              {recipe.category}
            </h4>
            <h4
              data-testid={ `${index}-horizontal-name` }
              className="card-text"
            >
              { recipe.name }
            </h4>
            { recipe.nationality && (
              <h4
                data-testid={ `${index}-horizontal-top-text` }
                className="card-text"
              >
                {`${recipe.nationality} - ${recipe.category}`}
              </h4>
            )}
            { recipe.alcoholicOrNot && (
              <h4
                data-testid={ `${index}-horizontal-top-text` }
                className="card-text"
              >
                {recipe.alcoholicOrNot}
              </h4>
            )}
            <h4
              data-testid={ `${index}-horizontal-done-date` }
              className="card-text"
            >
              { recipe.doneDate }
            </h4>
            {
              recipe.tags
              && (recipe.tags.map((tag) => (
                <h4
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  className="card-text"
                >
                  { tag }
                </h4>
              ))
              )
            }
            {/* src/images/shareIcon.svg */}
            <ShareButton
              testeId={ `${index}-horizontal-share-btn` }
              type={ recipe.type }
              id={ recipe.id }
            />
          </article>
        ))}
      </section>
    </>
  );
}

export default DoneRecipes;
