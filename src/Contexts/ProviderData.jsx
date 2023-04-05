import { useState, useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  drinksCategories,
  mealsCategories,
  mealsIngredients,
  mealsNationalities } from '../Services/ApiRequest';
import ContextData from './ContextData';

function ProviderData({ children }) {
  // const [user, setUser] = useState({});
  const [dataMeals, setDataMeals] = useState(null);
  const [dataDrinks, setDataDrinks] = useState(null);

  useEffect(() => {
    const requestMeals = async () => {
      const categories = await mealsCategories();
      const nationalities = await mealsNationalities();
      const ingredients = await mealsIngredients();

      if (ingredients) {
        setDataMeals({ categories, nationalities, ingredients });
        setDataDrinks(await drinksCategories());
      }
    };

    requestMeals();
  }, []);

  const values = useMemo(() => ({
    dataMeals,
    dataDrinks,
  }), [dataDrinks, dataMeals]);

  return (
    <ContextData.Provider value={ values }>
      { children }
    </ContextData.Provider>
  );
}

export const useData = () => useContext(ContextData);

ProviderData.propTypes = { children: PropTypes.node }.isRequired;

export default ProviderData;
