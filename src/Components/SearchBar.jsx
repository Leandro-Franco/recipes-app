import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../Contexts/ProviderData';
import { searchDrinkFirstLetter,
  searchDrinkName,
  searchDrinkIngredient,
  searchMealsFirtsLetter,
  searchMealsIngredients,
  searchMealsName } from '../Services/ApiRequest';

function SearchBar() {
  const {
    dataSearch,
    setDataSearch,
    resultsOfSearch,
    setResultsOfSearch,
  } = useContext(context);

  const history = useHistory();
  const page = (history.location.pathname);

  const testResults = () => {
    if (!resultsOfSearch) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const handleSubmit = async (event, option, text, local) => {
    event.preventDefault();
    if (local === '/drinks') {
      switch (option) {
      case 'ingredient':
        return (setResultsOfSearch(await searchDrinkIngredient(text)), testResults());
      case 'name':
        return (setResultsOfSearch(await searchDrinkName(text)), testResults());
      case 'firstLetter':
        return (setResultsOfSearch(await searchDrinkFirstLetter(text)), testResults());
      default:
        return console.log('default');
      }
    }
    if (local === '/meals') {
      switch (option) {
      case 'ingredient':
        return (setResultsOfSearch(await searchMealsIngredients(text)), testResults());
      case 'name':
        return (setResultsOfSearch(await searchMealsName(text)), testResults());
      case 'firstLetter':
        return (setResultsOfSearch(await searchMealsFirtsLetter(text)), testResults());
      default:
        return console.log('default');
      }
    }
  };

  return (
    <form>
      <input
        type="text"
        className="text-input"
        placeholder="Search"
        data-testid="search-input"
        value={ dataSearch.textSearch }
        onChange={ ({ target: { value } }) => {
          setDataSearch({ ...dataSearch, textSearch: value });
        } }
      />

      <div
        onChange={ ({ target: { value } }) => {
          setDataSearch({ ...dataSearch, searchOptions: value });
        } }
      >
        <label htmlFor="ingredient-search-radio">
          Ingredient
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
            name="searchOptions"
            value="ingredient"
          />
        </label>

        <label htmlFor="name-search-radio">
          Name
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name-search-radio"
            name="searchOptions"
            value="name"
          />
        </label>

        <label htmlFor="first-letter-search-radio">
          First Letter
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            name="searchOptions"
            value="firstLetter"
          />
        </label>
      </div>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ (event) => handleSubmit(
          event,
          dataSearch.searchOptions,
          dataSearch.textSearch,
          page,
        ) }
      >
        Find
      </button>
    </form>

  );
}

export default SearchBar;
