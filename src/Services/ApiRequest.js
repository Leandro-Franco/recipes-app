export const getMealsCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();

  return data.meals;
};

export const getMealsNationalities = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const data = await response.json();

  return data.meals;
};

export const getMealsIngredients = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const data = await response.json();

  return data.meals;
};

export const searchDrinkIngredient = async (ingredient) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();

  return data;
};

export const getMealsRecipes = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();

  return data.meals;
};

export const getDrinksRecipes = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();

  return data.drinks;
};

export const getDrinksCategories = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();

  return data.drinks;
};

export const getByCategory = async (url, path) => {
  const response = await fetch(url);
  const data = await response.json();

  return path === 'Meal' ? data.meals : data.drinks;
};

export const getById = async (url, type) => {
  const response = await fetch(url);
  const data = await response.json();

  return type === 'Meal' ? data.meals[0] : data.drinks[0];
};
