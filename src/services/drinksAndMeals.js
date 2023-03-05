const errorMessage = 'Sorry, we haven\'t found any recipes for these filters.';

export const getMealsData = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await request.json();
  return data.meals;
};

export const getDrinksData = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await request.json();
  console.log(data);
  return data.drinks;
};

export const getMealsDataByName = async (name) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await request.json();
  if (data.meals) {
    return data.meals;
  }
  global.alert(errorMessage);
  return ((prevState) => prevState);
};

export const getDrinksDataByName = async (name) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await request.json();
  if (data.drinks) {
    return data.drinks;
  }
  global.alert(errorMessage);
  return ((prevState) => prevState);
};

export const getMealsDataByFirstLetter = async (letter) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await request.json();
  if (data.meals) {
    return data.meals;
  }
  global.alert(errorMessage);
  return ((prevState) => prevState);
};

export const getDrinksDataByFirstLetter = async (letter) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await request.json();
  if (data.drinks) {
    return data.drinks;
  }
  global.alert(errorMessage);
  return ((prevState) => prevState);
};

export const getDrinksCategory = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const result = await request.json();
  return result.drinks;
};

export const getMealsCategory = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const result = await request.json();
  return result.meals;
};

export const getFilterDrinks = async (category) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const result = await request.json();
  return result.drinks;
};

export const getFilterMeals = async (category) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const result = await request.json();
  return result.meals;
};

export const getFilterDrinksByIngredients = async (ingredient) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const result = await request.json();
  return result.drinks;
};

export const getFilterMealsByIngredients = async (ingredient) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const result = await request.json();
  return result.meals;
};
