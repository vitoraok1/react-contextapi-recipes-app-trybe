const errorMessage = 'Sorry, we haven\'t found any recipes for these filters.';

export const getRecipes = async (type) => {
  const request = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?s=`);
  const result = await request.json();
  return result;
};

export const getRecipesByCategory = async (type) => {
  const request = await fetch(`https://www.${type}.com/api/json/v1/1/list.php?c=list`);
  const result = await request.json();
  return result;
};

export const getRecipesByName = async (type, name) => {
  const request = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?s=${name}`);
  const result = await request.json();
  if (result[Object.keys(result)[0]] === null) {
    global.alert(errorMessage);
    return ((prevState) => prevState);
  }
  return result;
};

export const getRecipesByFirstLetter = async (type, letter) => {
  const request = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?f=${letter}`);
  const result = await request.json();
  return result;
};

export const getFilterRecipes = async (type, category) => {
  const request = await fetch(`https://www.${type}.com/api/json/v1/1/filter.php?c=${category}`);
  const result = await request.json();
  return result;
};

export const getFilterByIngredients = async (type, ingredient) => {
  const request = await fetch(`https://www.${type}.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const result = await request.json();
  return result;
};
