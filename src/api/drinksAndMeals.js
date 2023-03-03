export const getMealsData = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await request.json();
  return data.meals;
};

export const getDrinksData = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await request.json();
  return data.drinks;
};
