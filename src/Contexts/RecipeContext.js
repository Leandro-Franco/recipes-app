import React, { useState, useEffect, useCallback, useMemo, createContext } from 'react';
import PropTypes from 'prop-types';
import { searchDrinkId, searchMealId, fetchIngredients } from '../Services/ApiRequest';
import RecipeInProgress from '../Pages/RecipeInProgress';

export const RecipeContext = createContext();

function RecipeContextProvider({ type }) {
  const [dataMeals, setDataMeals] = useState({
    categories: null,
    ingredients: null,
  });

  const [detailRecipes, setDetailRecipes] = useState({ detail: null });

  const fetchRecipeDetails = useCallback(async (recipeId) => {
    const id = recipeId;
    const meals = await searchMealId(id);
    const drinks = await searchDrinkId(id);
    const results = type === 'drinks' ? drinks : meals;
    const detail = results.drinks ? results.drinks[0] : results.meals[0];

    if (detail) {
      setDetailRecipes({ detail });
    }
  }, [type]);

  useEffect(() => {
    const requestMeals = async () => {
      const ingredients = await fetchIngredients('list');
      const categories = await fetchIngredients('category');

      if (ingredients) {
        setDataMeals({ categories, ingredients });
      }
    };
    requestMeals();
  }, []);

  const values = useMemo(() => ({ dataMeals, detailRecipes, fetchRecipeDetails }), [
    dataMeals,
    detailRecipes,
    fetchRecipeDetails,
  ]);

  return (
    <RecipeContext.Provider value={ values }>
      <RecipeInProgress type={ type } />
    </RecipeContext.Provider>
  );
}

RecipeContextProvider.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeContextProvider;
