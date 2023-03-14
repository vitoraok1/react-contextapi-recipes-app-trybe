import React, { useEffect, useContext, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [isShared, setIsShared] = useState(false);
  const [updateFavorite, setUpdateFavorite] = useState(false);
  const { favoriteRecipes, setFavoriteRecipes,
    favoriteRecipesFilter, setFavoriteRecipesFilter } = useContext(context);
  const favoriteRecipesData = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  useEffect(() => {
    if (favoriteRecipesData) {
      setFavoriteRecipes(favoriteRecipesData);
      setFavoriteRecipesFilter(favoriteRecipesData);
    }
    setUpdateFavorite(false);
  }, [updateFavorite]);

  const favoriteDrinks = () => {
    const drinks = favoriteRecipes.filter((recipes) => recipes.type === 'drink');
    setFavoriteRecipesFilter(drinks);
  };

  const favoriteMeals = () => {
    const meals = favoriteRecipes.filter((recipes) => recipes.type === 'meal');
    setFavoriteRecipesFilter(meals);
  };

  const favoriteAll = () => {
    setFavoriteRecipesFilter(favoriteRecipes);
  };

  const handleShare = (recipes) => {
    clipboardCopy(`http://localhost:3000/${recipes.type}s/${recipes.id}`);
    setIsShared(true);
  };

  const handleRemoveFavorite = (recipes) => {
    if (favoriteRecipesData.some((favorite) => favorite.id === recipes.id)) {
      const newFavorites = favoriteRecipesData
        .filter((favorite) => favorite.id !== recipes.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
    setUpdateFavorite(true);
  };

  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
        onClick={ favoriteAll }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ favoriteMeals }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ favoriteDrinks }
      >
        Drinks
      </button>
      {favoriteRecipesFilter.map((recipes, index) => (
        <div key={ index }>
          <Link
            to={ `/${recipes.type}s/${recipes.id}` }
            data-testid={ `${index}-horizontal-name` }
          >
            Nome:
            {' '}
            {recipes.name}
          </Link>
          <Link to={ `/${recipes.type}s/${recipes.id}` }>
            <img
              width="500"
              data-testid={ `${index}-horizontal-image` }
              alt="Imagem"
              src={ recipes.image }
            />
          </Link>
          <h4 data-testid={ `${index}-horizontal-top-text` }>
            {recipes.type === 'meal'
              ? `${recipes.nationality} - ${recipes.category}`
              : recipes.alcoholicOrNot }

          </h4>
          <button
            type="button"
            onClick={ () => handleShare(recipes) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share icon"
            />
          </button>
          { isShared ? <span>Link copied!</span> : null}
          <button type="button" onClick={ () => handleRemoveFavorite(recipes) }>
            <img
              src={ blackHeartIcon }
              alt="fav icon"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
