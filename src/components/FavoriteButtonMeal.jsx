import React, { useContext } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import context from '../context/Context';

export default function FavoriteButtonMeal() {
  const { mealsDetails, isMealFavorited, setIsMealFavorited } = useContext(context);
  const { idMeal, strCategory, strMeal, strMealThumb, strArea } = mealsDetails;
  const alreadyFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const saveOnLocalStorage = () => {
    const { pathname } = window.location;
    const inProgress = pathname.replace('/in-progress', '');
    const id = inProgress.replace('/meals/', '');
    const mealFavorite = {
      id: idMeal,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    if (alreadyFavorite.some((favorite) => favorite.id === id)) {
      const newFavorites = alreadyFavorite.filter((favorite) => favorite.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setIsMealFavorited(!isMealFavorited);
    } else {
      alreadyFavorite.push(mealFavorite);
      if (alreadyFavorite) {
        localStorage
          .setItem('favoriteRecipes', JSON.stringify(alreadyFavorite));
        setIsMealFavorited(!isMealFavorited);
      } localStorage.setItem('favoriteRecipes', JSON.stringify(alreadyFavorite));
      setIsMealFavorited(!isMealFavorited);
    }
  };

  return (
    <button type="button" onClick={ saveOnLocalStorage }>
      { isMealFavorited
        ? <img src={ blackHeartIcon } alt="fav icon" data-testid="favorite-btn" />
        : <img src={ whiteHeartIcon } alt="fav icon" data-testid="favorite-btn" />}
    </button>
  );
}
