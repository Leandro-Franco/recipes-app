import { useState, useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  getDrinksCategories,
  getMealsCategories,
  getMealsIngredients,
  getMealsNationalities } from '../Services/ApiRequest';
import ContextData from './ContextData';

function ProviderData({ children }) {
  // const [user, setUser] = useState({});
  const [dataMeals, setDataMeals] = useState({
    categories: [],
    nationalities: [],
    ingredients: [],
  });
  const [dataDrinks, setDataDrinks] = useState([]);

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
