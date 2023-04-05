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

export const searchMealsIngredients = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();

  return data;
};

export const searchMealsName = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();

  return data;
};

export const searchMealsFirtsLetter = async (letter) => {
  if (letter.length > 1) {
    return global.alert('Your search must have only 1 (one) character');
  }
  if (letter.length === 1) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await response.json();

    return data;
  } return null;
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

export const searchDrinkName = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();

  return data;
};

export const searchDrinkFirstLetter = async (letter) => {
  if (letter.length > 1) {
    return global.alert('Your search must have only 1 (one) character');
  }
  if (letter.length === 1) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await response.json();

    return data;
  } return null;
};
