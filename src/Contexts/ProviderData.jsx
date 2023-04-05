import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  mealsCategories,
  mealsIngredients,
  mealsNationalities,
  searchDrinkId,
  searchMealId,
} from '../Services/ApiRequest';
import ContextData from './ContextData';

function ProviderData({ children }) {
  // const [user, setUser] = useState({});
  const [dataMeals, setDataMeals] = useState({
    categories: null,
    nationalities: null,
    ingredients: null,
  });
  // const [dataDrinks, setDataDrinks] = useState(null);

  const [detailRecipes, setDetailRecipes] = useState(null);
  // const id = 52771;
  // const n2 = 178319;

  const fetchRecipeDetails = async (id, type) => {
    const food = await searchMealId(id);
    const drinks = await searchDrinkId(id);
    const results = type === 'drinks' ? drinks : food;
    const detail = results.drinks ? results.drinks[0] : results.meals[0];

    if (detail) {
      setDetailRecipes(detail);
    }
  };

  fetchRecipeDetails();

  console.log(detailRecipes);

  useEffect(() => {
    const requestMeals = async () => {
      const categories = await mealsCategories();
      const nationalities = await mealsNationalities();
      const ingredients = await mealsIngredients();

      if (ingredients) {
        setDataMeals({ categories, nationalities, ingredients });
      }
    };
    // console.log(dataMeals);
    requestMeals();
  }, []);

  // console.log(dataMeals);

  return (
    <ContextData.Provider
      value={ { dataMeals, detailRecipes, fetchRecipeDetails } }
    >
      { children }
    </ContextData.Provider>
  );
}

ProviderData.propTypes = { children: PropTypes.node }.isRequired;

export default ProviderData;
