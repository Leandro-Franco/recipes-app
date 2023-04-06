import { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { getRecipeById } from '../Services/ApiRequest';

const context = createContext();

export default context;

export function Provider({ children }) {
  const [dataSearch, setDataSearch] = useState({
    textSearch: '',
    searchOptions: '',
  });

  const [resultsOfSearch, setResultsOfSearch] = useState([]);

  const fetchRecipeDetails = async (recipeId, type) => {
    const meals = await getRecipeById(recipeId);
    const drinks = await getRecipeById(recipeId);
    const results = type === 'drinks' ? drinks : meals;
    const detail = results.drinks ? results.drinks[0] : results.meals[0];

    return detail;
  };

  const data = useMemo(() => ({
    dataSearch,
    resultsOfSearch,
    setDataSearch,
    setResultsOfSearch,
    fetchRecipeDetails,
  }), [dataSearch, resultsOfSearch]);

  return (
    <context.Provider value={ data }>
      { children }
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
