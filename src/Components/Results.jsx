import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../Contexts/ProviderData';

export function Results() {
  const {
    resultsOfSearch,
  } = useContext(context);

  const history = useHistory();
  const page = (history.location.pathname);

  const maxSize = 12;

  if (page === '/drinks' && resultsOfSearch.drinks) {
    const arrayDrinks = (resultsOfSearch.drinks).slice(0, maxSize);

    return (
      <div
        style={ {
          height: 380,
          overflow: 'auto',
        } }
      >
        {
          arrayDrinks.map((drink, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                alt={ drink.idDrink }
                src={ drink.strDrinkThumb }
                style={ {
                  resizeMode: 'cover',
                  height: 120,
                  width: 120,
                } }
              />
              <h2
                data-testid={ `${index}-card-name` }
              >
                { drink.strDrink}
              </h2>
            </div>
          ))
        }
      </div>
    );
  }
  if (page === '/meals' && resultsOfSearch.meals) {
    const arrayMeals = (resultsOfSearch.meals).slice(0, maxSize);

    return (
      <div
        style={ {
          height: 380,
          overflow: 'auto',
        } }
      >
        {
          arrayMeals.map((meals, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                alt={ meals.idMeal }
                src={ meals.strMealThumb }
                style={ {
                  resizeMode: 'cover',
                  height: 120,
                  width: 120,
                } }
              />
              <h2
                data-testid={ `${index}-card-name` }
              >
                { meals.idMeal }
              </h2>
            </div>
          ))
        }
      </div>
    );
  }
}
