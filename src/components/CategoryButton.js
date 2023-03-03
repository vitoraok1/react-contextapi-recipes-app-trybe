import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import context from '../context/Context';
import { getFilterDrinks, getFilterMeals } from '../api/drinksAndMeals';

export default function CategoryButton() {
  const {
    drinksCategory,
    mealsCategory,
    setDrinksData,
    setMealsData } = useContext(context);
  const maxButton = 5;
  const drinksPage = useRouteMatch('/drinks');

  const fetchFilter = async (category) => {
    if (drinksPage) {
      await setDrinksData(getFilterDrinks(category));
      console.log(await getFilterDrinks(category));
    } else {
      await setMealsData(getFilterMeals(category));
      console.log(await getFilterMeals(category));
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
      ;
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
            >
              {strCategory}
            </button>
          </div>

        ),
      )}
      ;
    </div>
  );

  return (
    <section>
      <div>{drinksPage ? drinksCategoryBtn : mealsCategoryBtn }</div>
    </section>
  );
}
