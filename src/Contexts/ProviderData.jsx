import { useState, useEffect, createContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  mealsCategories,
  searchMealsIngredients,
  mealsNationalities,
  searchDrinkId,
  searchMealId } from '../Services/ApiRequest';

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

  const [detailRecipes, setDetailRecipes] = useState({ detail: null });

  const requestMeals = async () => {
    const categories = await mealsCategories();
    const nationalities = await mealsNationalities();
    const ingredients = await searchMealsIngredients();

    if (ingredients) {
      setDataMeals({ categories, nationalities, ingredients });
    }
  };

  const fetchRecipeDetails = useCallback(async (id, type) => {
    const food = await searchMealId(id);
    const drinks = await searchDrinkId(id);
    const results = type === 'drinks' ? drinks : food;
    const detail = results.drinks ? results.drinks[0] : results.meals[0];

    if (detail) {
      setDetailRecipes({ detail });
    }
  }, []);

  useEffect(() => {
    requestMeals();
  }, []);

  const data = useMemo(() => ({
    dataMeals,
    dataSearch,
    resultsOfSearch,
    detailRecipes,
    fetchRecipeDetails,
    setDataSearch,
    setResultsOfSearch,
  }), [dataMeals, dataSearch, resultsOfSearch, detailRecipes, fetchRecipeDetails]);

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
