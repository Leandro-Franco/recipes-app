import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { searchDrinkId, searchMealId } from '../Services/ApiRequest';
import ContextData from './ContextData';

let type;
let id;

function ProviderData({ children }) {
  const [dataMeals, setDataMeals] = useState({
    categories: null,
    nationalities: null,
    ingredients: null,
  });

  const [detailRecipes, setDetailRecipes] = useState({ detail: null });

  const fetchRecipeDetails = useCallback(async (recipeId, recipeType) => {
    id = recipeId;
    type = recipeType;
    const food = await searchMealId(id);
    const drinks = await searchDrinkId(id);
    const results = type === 'drinks' ? drinks : food;
    const detail = results.drinks ? results.drinks[0] : results.meals[0];

    if (detail) {
      setDetailRecipes({ detail });
    }
  }, []);

  useEffect(() => {
    const requestMeals = async () => {
      const ingredients = await fetchIngredients();
      const categories = await fetchCategories();
      const nationalities = await fetchNationalities();

      if (ingredients) {
        setDataMeals({ categories, nationalities, ingredients });
      }
    };
    requestMeals();
  }, []);

  return (
    <ContextData.Provider
      value={ { dataMeals, detailRecipes, fetchRecipeDetails } }
    >
      { children }
    </ContextData.Provider>
  );
}

ProviderData.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderData;
