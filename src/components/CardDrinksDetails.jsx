import React, { useState, useEffect } from 'react';
import { getRecipesById } from '../services/drinksAndMeals';

export default function CardDrinksDetails() {
  const [drinkDetails, setDrinkDetails] = useState({});
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [drinkIngredientsMeasure, setDrinkIngredientsMeasure] = useState([]);

  useEffect(() => {
    const minNumberIngredient = 17;
    const maxNumberIngredient = 32;
    const minNumberMeasure = 32;
    const maxNumberMeasure = 48;
    const { pathname } = window.location;
    const replaceDrinks = pathname.replace('/drinks/', '');
    const everyDrinks = getRecipesById('thecocktaildb', replaceDrinks);
    everyDrinks.then((total) => {
      console.log(Object.entries(total[0]));
      setDrinkDetails(total[0]);
      setDrinkIngredients(Object.entries(total[0])
        .slice(minNumberIngredient, maxNumberIngredient)
        .filter((ingredient) => (ingredient[1])));
      setDrinkIngredientsMeasure(Object.entries(total[0])
        .slice(minNumberMeasure, maxNumberMeasure)
        .filter((measure) => (measure[1])));
    });
  }, []);
  console.log(drinkIngredients);
  console.log(drinkIngredientsMeasure);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt={ drinkDetails.strDrink }
        src={ drinkDetails.strDrinkThumb }
      />
      <title data-testid="recipe-title">{ drinkDetails.strDrink }</title>
      <span data-testid="recipe-category">{ drinkDetails.strAlcoholic }</span>
      {drinkIngredients.map((ingredient, index) => (
        <span
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${ingredient[1]}
         ${drinkIngredientsMeasure[index] ? drinkIngredientsMeasure[index][1] : ''}`}
        </span>
      ))}
      <span data-testid="instructions">{ drinkDetails.strInstructions }</span>
    </div>
  );
}
