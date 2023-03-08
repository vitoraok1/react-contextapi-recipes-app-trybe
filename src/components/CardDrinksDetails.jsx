import React, { useContext } from 'react';
import context from '../context/Context';

export default function CardDrinksDetails() {
  const {
    drinkDetails,
  } = useContext(context);
  // const {
  //   strDrinkThumb, strDrink, strCategory, strInstructions,
  // } = drinkDetails[0];
  // let ingredients = [];
  // Object.keys(drinkDetails).forEach((property) => {
  //   if (property.includes('strIngredient') && drinkDetails[property]) {
  //     ingredients = [...ingredients, drinkDetails[property]];
  //   }
  // });
  // console.log(ingredients);
  // const ingredientFilter = () => {
  //   const ingredient = drinkDetails.drinks
  //     .filter((property) => (Object.keys(property).includes('strIngredient')));
  //   console.log(ingredient);
  // };
  // ingredientFilter();
  console.log(drinkDetails);
  return (
    <div>
      {/* <img data-testid="recipe-photo" alt="a" src={ strDrinkThumb } />
      <title data-testid="recipe-title">{ strDrink }</title>
      <span data-testid="recipe-category">{ strCategory }</span> */}
      {/* <span data-testid={ `${index}-ingredient-name-and-measure` }>a</span> */}
      {/* <span data-testid="instructions">{ strInstructions }</span> */}
    </div>
  );
}
