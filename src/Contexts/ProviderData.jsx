import { useState, useEffect, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  mealsCategories,
  searchMealsIngredients,
  mealsNationalities } from '../Services/ApiRequest';

const context = createContext();

export default context;

export function Provider({ children }) {
  // const [user, setUser] = useState({});
  const [dataMeals, setDataMeals] = useState({
    categories: null,
    nationalities: null,
    ingredients: null,
  });
  // const [dataDrinks, setDataDrinks] = useState(null);

  const [dataSearch, setDataSearch] = useState({
    textSearch: '',
    searchOptions: '',
  });

  const [resultsOfSearch, setResultsOfSearch] = useState([]);

  const requestMeals = async () => {
    const categories = await mealsCategories();
    const nationalities = await mealsNationalities();
    const ingredients = await searchMealsIngredients();

    if (ingredients) {
      setDataMeals({ categories, nationalities, ingredients });
    }
  };

  useEffect(() => {
    requestMeals();
  }, []);

  const data = useMemo(() => ({
    dataMeals,
    dataSearch,
    resultsOfSearch,
    setDataSearch,
    setResultsOfSearch,
  }), [dataMeals, dataSearch, resultsOfSearch]);

  return (
    <context.Provider
      value={ data }
    >
      { children }
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
