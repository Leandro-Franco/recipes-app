import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  getDrinksCategories,
  getMealsCategories,
  getMealsIngredients,
  getMealsNationalities,
  searchDrinkId,
  searchMealId,
} from '../Services/ApiRequest';
import ContextData from './ContextData';

function ProviderData({ children }) {
  // const [user, setUser] = useState({});
  const [dataMeals, setDataMeals] = useState({
    categories: [],
    nationalities: [],
    ingredients: [],
  });
  const [dataDrinks, setDataDrinks] = useState([]);

  const [detailRecipes, setDetailRecipes] = useState({ detail: null });
  // const id = 178319;

  const fetchRecipeDetails = useCallback(async (id, type) => {
    const food = await searchMealId(id);
    const drinks = await searchDrinkId(id);
    const results = type === 'drinks' ? drinks : food;
    const detail = results.drinks ? results.drinks[0] : results.meals[0];

    if (detail) {
      setDetailRecipes({ detail });
    }
  }, []);

  // console.log(detailRecipes);

  useEffect(() => {
    const request = async () => {
      setDataMeals({
        categories: await getMealsCategories(),
        nationalities: await getMealsNationalities(),
        ingredients: await getMealsIngredients(),
      });
      setDataDrinks(await getDrinksCategories());
      console.log(dataMeals);
      console.log(dataDrinks);
    };
    request();
  }, []);

  const values = useMemo(() => ({
    dataMeals,
    dataDrinks,
    detailRecipes,
    fetchRecipeDetails,
  }), [dataDrinks, dataMeals, detailRecipes, fetchRecipeDetails]);

  return (
    <ContextData.Provider value={ values }>
      { children }
    </ContextData.Provider>
  );
}

export const useData = () => useContext(ContextData);

ProviderData.propTypes = { children: PropTypes.node }.isRequired;

export default ProviderData;
