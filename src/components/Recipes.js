import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import context from '../context/Context';
import CategoryButton from './CategoryButton';

export default function Recipes() {
  const { drinksData, mealsData } = useContext(context);
  const maxCards = 12;
  const drinksPage = useRouteMatch('/drinks');

  const drinksCard = (
    <div>
      <CategoryButton />
      {drinksData.slice(0, maxCards).map(
        ({ strDrink, strDrinkThumb }, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              alt={ strDrink }
              src={ strDrinkThumb }
              data-testid={ `${index}-card-img` }
            />
            <h2 key={ strDrink } data-testid={ `${index}-card-name` }>{ strDrink }</h2>
          </div>
        ),
      )}
      ;
    </div>
  );
  const mealsCard = (
    <div>
      <CategoryButton />
      {mealsData.slice(0, maxCards).map(
        ({ strMeal, strMealThumb }, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              alt={ strMeal }
              src={ strMealThumb }
              data-testid={ `${index}-card-img` }
            />
            <h2 key={ strMeal } data-testid={ `${index}-card-name` }>{ strMeal }</h2>
          </div>

        ),
      )}
      ;
    </div>
  );

  return (
    <div>{drinksPage ? drinksCard : mealsCard }</div>
  );
}
