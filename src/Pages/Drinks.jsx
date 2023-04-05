import { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';
import { getDrinksRecipes } from '../Services/ApiRequest';

function Drinks() {
  const [drinksRecipes, setDrinksRecipes] = useState([]);

  useEffect(() => {
    const requestDrinks = async () => {
      const eleven = 11;
      const response = await getDrinksRecipes();
      setDrinksRecipes(response.filter((_, idx) => idx <= eleven));
    };

    requestDrinks();
  }, []);

  return (
    <>
      <Header title="Drinks" />
      <Recipes path="Drink" recipes={ drinksRecipes } />
      <Footer />
    </>
  );
}

export default Drinks;
