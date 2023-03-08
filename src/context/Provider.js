import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { getRecipes, getRecipesByCategory } from '../services/drinksAndMeals';

function Provider({ children }) {
  const [drinksData, setDrinksData] = useState([]);
  const [mealsData, setMealsData] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);
  const [mealsCategory, setMealsCategory] = useState([]);

  useEffect(() => {
    const { pathname } = window.location;
    const type = pathname.includes('/meals') ? 'themealdb' : 'thecocktaildb';
    console.log(type);

    const fetchRecipes = async () => {
      if (pathname.includes === ('/drinks')) {
        setDrinksData(await getRecipes(type));
        setDrinksCategory(await getRecipesByCategory(type));
      }
      if (pathname.includes === ('/meals')) {
        setMealsData(await getRecipes(type));
        setMealsCategory(await getRecipesByCategory(type));
      }
    };
    fetchRecipes();
  }, []);

  const context = useMemo(() => ({
    drinksCategory,
    mealsCategory,
    drinksData,
    mealsData,
    setDrinksData,
    setMealsData,
  }), [drinksCategory, mealsCategory, drinksData, mealsData]);

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
