import { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';
import { getMealsRecipes } from '../Services/ApiRequest';
import { useData } from '../Contexts/ProviderData';

function Meals() {
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const { dataMeals } = useData();

  useEffect(() => {
    const requestMeals = async () => {
      const eleven = 11;
      const recipeResponse = await getMealsRecipes();
      setMealsRecipes(recipeResponse.filter((_, idx) => idx <= eleven));
    };
    requestMeals();
  }, []);

  useEffect(() => {
    if (dataMeals) {
      const { categories } = dataMeals;
      const four = 4;
      setMealsCategories(categories.filter((_, idx) => idx <= four));
    }
  }, [dataMeals]);

  return (
    <>
      <Header title="Meals" />
      <Recipes
        path="Meal"
        recipes={ mealsRecipes }
        categories={ mealsCategories }
      />
      <Footer />
    </>
  );
}

export default Meals;
