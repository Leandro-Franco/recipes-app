import React, { useState, useEffect, useCallback, useMemo, createContext } from 'react';
import { searchDrinkId, searchMealId, fetchIngredients } from '../Services/ApiRequest';
import RecipeInProgress from '../Pages/RecipeInProgress';

export const RecipeContext = createContext();

function RecipeContextProvider() {
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
  }, []);

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
      <RecipeInProgress />
    </RecipeContext.Provider>
  );
}

export default RecipeContextProvider;
