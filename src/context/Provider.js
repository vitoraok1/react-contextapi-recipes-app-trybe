import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { getDrinksData, getMealsData } from '../api/drinksAndMeals';

function Provider({ children }) {
  const [drinksData, setDrinksData] = useState([]);
  const [mealsData, setMealsData] = useState([]);

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
  const context = useMemo(() => ({
    drinksData,
    mealsData,
  }), [drinksData, mealsData]);

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
