import React, { useContext, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import context from '../context/Context';
import {
  getFilterDrinks,
  getFilterMeals,
  getDrinksData,
  getMealsData } from '../services/drinksAndMeals';

export default function CategoryButton() {
  const {
    drinksCategory,
    mealsCategory,
    setDrinksData,
    setMealsData } = useContext(context);
  const maxButton = 5;
  const drinksPage = useRouteMatch('/drinks');
  const [isMealsFiltered, setIsMealsFiltered] = useState(false);
  const [isDrinksFiltered, setIsDrinksFiltered] = useState(false);

  const fetchFilter = (category) => {
    if (drinksPage && category && isDrinksFiltered) {
      // Precisei usar um .then para esperar a promise se resolver para para de quebrar o código na parte do .slice
      const everyDrinks = getDrinksData();
      everyDrinks.then((total) => {
        setDrinksData(total);
        setIsDrinksFiltered(!isDrinksFiltered);
      });
    } else if (drinksPage && category) {
      const totalPromiseDrinks = getFilterDrinks(category);
      totalPromiseDrinks.then((total) => {
        setDrinksData(total);
        setIsDrinksFiltered(!isDrinksFiltered);
      });
    } else if (drinksPage && !category) {
      const everyDrinks = getDrinksData();
      everyDrinks.then((total) => {
        setDrinksData(total);
      });
    } else if (!drinksPage && category && isMealsFiltered) {
      const everyMeals = getMealsData();
      everyMeals.then((total) => {
        setMealsData(total);
        setIsMealsFiltered(!isMealsFiltered);
      });
    } else if (!drinksPage && category) {
      const totalPromiseMeals = getFilterMeals(category);
      totalPromiseMeals.then((total) => {
        setMealsData(total);
        setIsMealsFiltered(!isMealsFiltered);
      });
    } else {
      const everyMeals = getMealsData();
      everyMeals.then((total) => {
        setMealsData(total);
      });
    }
  };

  const drinksCategoryBtn = (
    <div>
      {drinksCategory.slice(0, maxButton).map(
        ({ strCategory }) => (
          <div key={ strCategory }>
            <button
              data-testid={ `${strCategory}-category-filter` }
              onClick={ ({ target }) => { fetchFilter(target.value); } }
              value={ strCategory }
            >
              {strCategory}
            </button>
          </div>

        ),
      )}
    </div>
  );
  const mealsCategoryBtn = (
    <div>
      {mealsCategory.slice(0, maxButton).map(
        ({ strCategory }) => (
          <div key={ strCategory }>
            <button
              data-testid={ `${strCategory}-category-filter` }
              onClick={ ({ target }) => { fetchFilter(target.value); } }
              value={ strCategory }
            >
              {strCategory}
            </button>
          </div>

        ),
      )}
    </div>
  );

  return (
    <section>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => fetchFilter() }
      >
        All
      </button>
      <div>{drinksPage ? drinksCategoryBtn : mealsCategoryBtn }</div>
    </section>
  );
}
