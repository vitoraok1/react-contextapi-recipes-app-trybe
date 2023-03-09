import React, { useContext, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Carousel } from 'react-responsive-carousel';
import clipboardCopy from 'clipboard-copy';
import context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function CardDrinksDetails() {
  const { mealsDetails,
    drinksData,
    isCopy,
    setIsCopy, saveId, isMealFavorited, setIsMealFavorited } = useContext(context);
  const { drinks } = drinksData;
  const { idMeal, strCategory, strMeal, strMealThumb, strArea } = mealsDetails;
  const maxCards = 6;
  let ingredients = [];
  let measure = [];
  const alreadyFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

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

  useEffect(() => {
    const { pathname } = window.location;
    const id = pathname.replace('/meals/', '');
    if (alreadyFavorite.some((favorite) => favorite.id === id)) {
      setIsMealFavorited(!isMealFavorited);
    }
  }, []);

  const saveOnLocalStorage = () => {
    const mealFavorite = {
      id: idMeal,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    alreadyFavorite.push(mealFavorite);
    if (alreadyFavorite) {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify(alreadyFavorite));
      setIsMealFavorited(!isMealFavorited);
    } localStorage.setItem('favoriteRecipes', JSON.stringify(alreadyFavorite));
    setIsMealFavorited(!isMealFavorited);
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
      <button type="button" onClick={ saveOnLocalStorage }>
        { isMealFavorited
          ? <img src={ blackHeartIcon } alt="fav icon" data-testid="favorite-btn" />
          : <img src={ whiteHeartIcon } alt="fav icon" data-testid="favorite-btn" />}
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
