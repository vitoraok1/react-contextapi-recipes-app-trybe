import React, { useContext, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import context from '../context/Context';
import { getRecipes, getFilterRecipes } from '../services/drinksAndMeals';

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

  const fetchFilter = (name, category) => {
    if (drinksPage && category && isDrinksFiltered) {
      const everyDrinks = getRecipes(name);
      everyDrinks.then((total) => {
        setDrinksData(total);
        setIsDrinksFiltered(!isDrinksFiltered);
      });
    } else if (drinksPage && category) {
      const totalPromiseDrinks = getFilterRecipes(name, category);
      totalPromiseDrinks.then((total) => {
        setDrinksData(total);
        setIsDrinksFiltered(!isDrinksFiltered);
      });
    } else if (drinksPage && !category) {
      const everyDrinks = getRecipes('thecocktaildb');
      everyDrinks.then((total) => {
        setDrinksData(total);
      });
    } else if (!drinksPage && category && isMealsFiltered) {
      const everyMeals = getRecipes(name);
      everyMeals.then((total) => {
        setMealsData(total);
        setIsMealsFiltered(!isMealsFiltered);
      });
    } else if (!drinksPage && category) {
      const totalPromiseMeals = getFilterRecipes(name, category);
      totalPromiseMeals.then((total) => {
        setMealsData(total);
        setIsMealsFiltered(!isMealsFiltered);
      });
    } else {
      const everyMeals = getRecipes('themealdb');
      everyMeals.then((total) => {
        setMealsData(total);
      });
    }
  };

  const drinksCategoryBtn = () => {
    const drinksByCategories = drinksCategory.drinks;
    const drinkUrl = 'thecocktaildb';

    return (
      <div>
        {drinksByCategories?.slice(0, maxButton).map(
          ({ strCategory }) => (
            <div key={ strCategory }>
              <button
                data-testid={ `${strCategory}-category-filter` }
                onClick={ ({ target }) => { fetchFilter(drinkUrl, target.value); } }
                value={ strCategory }
              >
                {strCategory}
              </button>
            </div>

          ),
        )}
      </div>
    );
  };

  const mealsCategoryBtn = () => {
    const mealsByCategories = mealsCategory.meals;
    const mealUrl = 'themealdb';

    return (
      <div>
        {mealsByCategories?.slice(0, maxButton).map(
          ({ strCategory }) => (
            <div key={ strCategory }>
              <button
                data-testid={ `${strCategory}-category-filter` }
                onClick={ ({ target }) => { fetchFilter(mealUrl, target.value); } }
                value={ strCategory }
              >
                {strCategory}
              </button>
            </div>

          ),
        )}
      </div>
    );
  };

  return (
    <section>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => fetchFilter() }
      >
        All
      </button>
      <div>{drinksPage ? drinksCategoryBtn() : mealsCategoryBtn() }</div>
    </section>
  );
}
