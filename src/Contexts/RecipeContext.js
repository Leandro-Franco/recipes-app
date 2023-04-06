import React, { useState, useCallback, useMemo, createContext } from 'react';
import { searchDrinkId, searchMealId } from '../Services/ApiRequest';
import RecipeInProgress from '../Pages/RecipeInProgress';

export const RecipeContext = createContext();

function RecipeContextProvider() {
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
  }, []);

  const values = useMemo(() => ({ detailRecipes, fetchRecipeDetails }), [
    detailRecipes,
    fetchRecipeDetails,
  ]);

  return (
    <RecipeContext.Provider value={ values }>
      <RecipeInProgress />
    </RecipeContext.Provider>
  );
}

export default RecipeContextProvider;
