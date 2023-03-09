import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import { Carousel } from 'react-responsive-carousel';
import clipboardCopy from 'clipboard-copy';
import context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function CardDrinksDetails() {
  const { mealsDetails, drinksData, isCopy, setIsCopy, saveId } = useContext(context);
  const { drinks } = drinksData;
  const maxCards = 6;
  let ingredients = [];
  let measure = [];
  Object.entries(mealsDetails).forEach((property) => {
    if (property[0].startsWith('strIngredient') && property[1]) {
      ingredients = [...ingredients, property[1]];
    }
    if (property[0].startsWith('strMeasure') && property[1]) {
      measure = [...measure, property[1]];
    }
  });

  const handleShare = (id) => {
    clipboardCopy(`http://localhost:3000/meals/${id}`);
    setIsCopy(true);
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt={ mealsDetails.strMeal }
        src={ mealsDetails.strMealThumb }
      />
      <h1 data-testid="recipe-title">{ mealsDetails.strMeal }</h1>
      <span data-testid="recipe-category">{ mealsDetails.strCategory }</span>
      {ingredients.map((ingredient, index) => (
        <span
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${ingredient}
           ${measure[index] ? measure[index] : ''}`}
        </span>
      ))}
      <span data-testid="instructions">{ mealsDetails.strInstructions }</span>
      <br />
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="fav icon" />
      </button>
      {' '}
      <button type="button" data-testid="share-btn" onClick={ () => handleShare(saveId) }>
        <img src={ shareIcon } alt="share icon" />
      </button>
      { isCopy ? <span>Link copied!</span> : null}
      <ReactPlayer
        data-testid="video"
        url={ mealsDetails.strYoutube }
      />
      <Carousel>
        {drinks?.slice(0, maxCards).map(
          ({ strDrink, strDrinkThumb }, index) => (
            <div key={ index } data-testid={ `${index}-recommendation-card` }>

              <img
                alt={ strDrink }
                src={ strDrinkThumb }
              />

              <h2 key={ strDrink } data-testid={ `${index}-recommendation-title` }>
                { strDrink }
              </h2>
            </div>
          ),
        )}
      </Carousel>
    </div>
  );
}
