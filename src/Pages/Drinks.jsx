import { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { Results } from '../Components/Results';
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
      <Results />
      {/* adicionar modo de alternar entre results e recipes */}
      <Recipes path="Drink" recipes={ drinksRecipes } />
      <Footer />
    </>
  );
}

export default Drinks;
