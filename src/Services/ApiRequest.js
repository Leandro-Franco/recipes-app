export const mealsCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();

  return data;
};

export const mealsNationalities = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const data = await response.json();

  return data;
};

export const mealsIngredients = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const data = await response.json();

  return data;
};

export const searchDrinkIngredient = async (ingredient) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();

  return data;
};

export const searchDrinkId = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();

  return data;
};

export const searchMealsId = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();

  return data;
};
