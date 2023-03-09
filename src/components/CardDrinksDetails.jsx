import React, { useContext } from 'react';
import context from '../context/Context';

export default function CardDrinksDetails() {
  const { drinkDetails } = useContext(context);
  console.log(drinkDetails);

  let ingredients = [];
  let measure = [];
  Object.entries(drinkDetails).forEach((property) => {
    if (property[0].startsWith('strIngredient') && property[1]) {
      ingredients = [...ingredients, property[1]];
    }
    if (property[0].startsWith('strMeasure') && property[1]) {
      measure = [...measure, property[1]];
    }
  });

  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt={ drinkDetails.strDrink }
        src={ drinkDetails.strDrinkThumb }
      />
      <title data-testid="recipe-title">{ drinkDetails.strDrink }</title>
      <span data-testid="recipe-category">{ drinkDetails.strAlcoholic }</span>
      {ingredients.map((ingredient, index) => (
        <span
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${ingredient} -
         ${measure[index] ? measure[index] : ''}`}
        </span>
      ))}
      <span data-testid="instructions">{ drinkDetails.strInstructions }</span>
    </div>
  );
}
