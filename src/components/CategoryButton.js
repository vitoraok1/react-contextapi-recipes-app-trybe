import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import context from '../context/Context';

export default function CategoryButton() {
  const { drinksCategory, mealsCategory } = useContext(context);
  const maxButton = 5;
  const drinksPage = useRouteMatch('/drinks');

  const drinksCategoryBtn = (
    <div>
      {drinksCategory.slice(0, maxButton).map(
        ({ strCategory }) => (
          <div key={ strCategory }>
            <button
              data-testid={ `${strCategory}-category-filter` }
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
    <div>{drinksPage ? drinksCategoryBtn : mealsCategoryBtn }</div>
  );
}
