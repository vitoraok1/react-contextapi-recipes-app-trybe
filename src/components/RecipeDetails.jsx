import React from 'react';

import CardMealsDetails from './CardMealsDetails';
import CardDrinksDetails from './CardDrinksDetails';

export default function RecipeDetails() {
  return (
    <div>
      {window.location.pathname
        .includes('/meals') ? <CardMealsDetails /> : <CardDrinksDetails />}
    </div>
  );
}
