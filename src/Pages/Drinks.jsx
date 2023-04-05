import { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';
import { getDrinksRecipes } from '../Services/ApiRequest';
import { useData } from '../Contexts/ProviderData';

function Drinks() {
  const [drinksRecipes, setDrinksRecipes] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const { dataDrinks } = useData();

  useEffect(() => {
    const requestDrinks = async () => {
      const eleven = 11;
      const response = await getDrinksRecipes();
      setDrinksRecipes(response.filter((_, idx) => idx <= eleven));
    };
    requestDrinks();
  }, []);

  useEffect(() => {
    if (dataDrinks) {
      const four = 4;
      setDrinksCategories(dataDrinks.filter((_, idx) => idx <= four));
    }
  }, [dataDrinks]);

  return (
    <>
      <Header title="Drinks" />
      <Recipes path="Drink" recipes={ drinksRecipes } categories={ drinksCategories } />
      <Footer />
    </>
  );
}

export default Drinks;
