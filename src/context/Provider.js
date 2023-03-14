import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [drinksData, setDrinksData] = useState([]);
  const [mealsData, setMealsData] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);
  const [mealsCategory, setMealsCategory] = useState([]);
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [mealsDetails, setMealsDetails] = useState([]);
  const [saveId, setSaveId] = useState('');
  const [isCopy, setIsCopy] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [isDrinkFavorited, setIsDrinkFavorited] = useState(false);
  const [isMealFavorited, setIsMealFavorited] = useState(false);
  const [ingredientsChecked, setIngredientsChecked] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doneRecipesFilter, setDoneRecipesFilter] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteRecipesFilter, setFavoriteRecipesFilter] = useState([]);

  const context = useMemo(() => ({
    drinksCategory,
    mealsCategory,
    drinksData,
    mealsData,
    drinkDetails,
    mealsDetails,
    saveId,
    isCopy,
    recipeInProgress,
    isDrinkFavorited,
    isMealFavorited,
    ingredientsChecked,
    doneRecipes,
    doneRecipesFilter,
    favoriteRecipes,
    favoriteRecipesFilter,
    setDrinksData,
    setMealsData,
    setDrinkDetails,
    setMealsDetails,
    setDrinksCategory,
    setMealsCategory,
    setSaveId,
    setIsCopy,
    setRecipeInProgress,
    setIsDrinkFavorited,
    setIsMealFavorited,
    setIngredientsChecked,
    setDoneRecipes,
    setDoneRecipesFilter,
    setFavoriteRecipes,
    setFavoriteRecipesFilter,
  }), [drinksCategory,
    mealsCategory,
    drinksData,
    mealsData,
    mealsDetails,
    drinkDetails,
    saveId,
    isCopy,
    isDrinkFavorited,
    recipeInProgress,
    isMealFavorited,
    ingredientsChecked,
    doneRecipes,
    doneRecipesFilter,
    favoriteRecipes,
    favoriteRecipesFilter]);

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
