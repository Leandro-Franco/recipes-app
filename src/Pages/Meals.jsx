import { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';
import { getMealsRecipes } from '../Services/ApiRequest';

function Meals() {
  const [mealsRecipes, setMealsRecipes] = useState([]);

  useEffect(() => {
    const requestMeals = async () => {
      const eleven = 11;
      const response = await getMealsRecipes();
      setMealsRecipes(response.filter((_, idx) => idx <= eleven));
    };

    requestMeals();
  }, []);

  return (
    <>
      <Header title="Meals" />
      <Recipes path="Meal" recipes={ mealsRecipes } />
      <Footer />
    </>
  );
}

export default Meals;
