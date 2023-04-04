import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  mealsCategories,
  mealsIngredients,
  mealsNationalities,
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
      value={ dataMeals }
    >
      { children }
    </ContextData.Provider>
  );
}

ProviderData.propTypes = { children: PropTypes.node }.isRequired;

export default ProviderData;
