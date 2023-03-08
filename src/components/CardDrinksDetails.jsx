import React, { useContext } from 'react';
import context from '../context/Context';

export default function CardDrinksDetails() {
  const { drinkDetails } = useContext(context);
  // const [drinkIngredients, setDrinkIngredients] = useState([]);
  // const [drinkIngredientsMeasure, setDrinkIngredientsMeasure] = useState([]);

  console.log(drinkDetails);
  // console.log(drinkIngredientsMeasure);

  // let ingredients = [];
  // Object.keys(drinkDetails).forEach((property) => {
  //   if (property.includes('strIngredient') && drinkDetails[property]) {
  //     ingredients = [...ingredients, drinkDetails[property]];
  //   }
  // });
  // console.log(ingredients);

  const ingredientFilter = () => {
    const ingredient = drinkDetails.drinks
      .filter((property) => (Object.keys(property).includes('strIngredient')));
    console.log(ingredient);
  };
  ingredientFilter();

  return (
    <div>
      {/* <img
        data-testid="recipe-photo"
        alt={ drinkDetails.strDrink }
        src={ drinkDetails.strDrinkThumb }
      />
      <title data-testid="recipe-title">{ drinkDetails.strDrink }</title>
      <span data-testid="recipe-category">{ drinkDetails.strAlcoholic }</span>
      {drinkIngredients.map((ingredient, index) => {
        console.log(ingredient[1]);
        return (
          <span
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient[1]} -
         ${drinkIngredientsMeasure[index] ? drinkIngredientsMeasure[index][1] : ''}`}
          </span>
        );
      })}
      <span data-testid="instructions">{ drinkDetails.strInstructions }</span> */}
    </div>
  );
}
