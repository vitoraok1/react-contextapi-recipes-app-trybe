import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import {
  getDrinksData,
  getMealsData,
  getMealsCategory,
  getDrinksCategory } from '../api/drinksAndMeals';

function Provider({ children }) {
  const [drinksData, setDrinksData] = useState([]);
  const [mealsData, setMealsData] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);
  const [mealsCategory, setMealsCategory] = useState([]);

  useEffect(
    () => {
      const mealsApi = async () => {
        const result = await getMealsData();
        setMealsData(result);
      };
      const drinksApi = async () => {
        const result = await getDrinksData();
        setDrinksData(result);
      };
      mealsApi();
      drinksApi();
    },
    [],
  );
  useEffect(
    () => {
      const mealsCategoryApi = async () => {
        const result = await getMealsCategory();
        setMealsCategory(result);
      };
      const drinksCategoryApi = async () => {
        const result = await getDrinksCategory();
        setDrinksCategory(result);
      };
      mealsCategoryApi();
      drinksCategoryApi();
    },
    [],
  );
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
