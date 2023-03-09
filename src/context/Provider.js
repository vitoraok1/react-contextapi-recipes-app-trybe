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
  // console.log(drinksData);
  // console.log(mealsData);

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
    setDrinksData,
    setMealsData,
    setDrinkDetails,
    setMealsDetails,
    setDrinksCategory,
    setMealsCategory,
    setSaveId,
    setIsCopy,
    setRecipeInProgress,
  }), [drinksCategory,
    mealsCategory,
    drinksData,
    mealsData,
    mealsDetails,
    drinkDetails,
    saveId,
    isCopy,
    recipeInProgress]);

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
