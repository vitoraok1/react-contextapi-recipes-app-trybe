import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import context from '../context/Context';

export default function FavoriteButtonDrink() {
  const { drinkDetails, isDrinkFavorited, setIsDrinkFavorited } = useContext(context);
  const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb } = drinkDetails;
  const alreadyFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const { pathname } = useLocation();

  const saveOnLocalStorage = () => {
    const inProgress = pathname.replace('/in-progress', '');
    const id = inProgress.replace('/drinks/', '');
    const drinkFavorite = {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    if (alreadyFavorite.some((favorite) => favorite.id === id)) {
      const newFavorites = alreadyFavorite.filter((favorite) => favorite.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setIsDrinkFavorited(!isDrinkFavorited);
    } else {
      alreadyFavorite.push(drinkFavorite);
      if (alreadyFavorite) {
        localStorage
          .setItem('favoriteRecipes', JSON.stringify(alreadyFavorite));
        setIsDrinkFavorited(!isDrinkFavorited);
      } localStorage.setItem('favoriteRecipes', JSON.stringify(alreadyFavorite));
      setIsDrinkFavorited(!isDrinkFavorited);
    }
  };

  return (
    <div>
      <button type="button" onClick={ saveOnLocalStorage }>
        { isDrinkFavorited
          ? <img src={ blackHeartIcon } alt="fav icon" data-testid="favorite-btn" />
          : <img src={ whiteHeartIcon } alt="fav icon" data-testid="favorite-btn" />}
      </button>
    </div>
  );
}
