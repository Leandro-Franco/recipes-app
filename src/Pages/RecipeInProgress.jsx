import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import useRecipeInProgress from '../hooks/useRecipeInProgress';
import ShareButton from '../Components/ShareButton';
import FavoriteButton from '../Components/FavoriteButton';
import IngredientList from '../Components/IngredientList';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function RecipeInProgress() {
  const { id, type } = useParams();
  const { recipe, loading, error } = useRecipeInProgress(type, id);
  const history = useHistory();

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <p>
        Something went wrong:
        {' '}
        {error.message}
      </p>
    );
  }

  const {
    strMealThumb,
    strDrinkThumb,
    strMeal,
    strDrink,
    strCategory,
    strAlcoholic,
    strInstructions,
    ingredients,
    measures,
  } = recipe;

  function formatCategoryAndAlcoholicInfo(category, isAlcoholic) {
    if (category && isAlcoholic) {
      return `${category} - Alcoholic`;
    } if (category) {
      return category;
    } if (isAlcoholic) {
      return 'Alcoholic';
    }
    return '';
  }

  const handleFinishRecipe = () => {
    history.push(`/receitas-feitas/${type}/${id}`);
  };

  return (
    <>
      <Header title={ type === 'meal' ? strMeal : strDrink } />
      <div>
        <img
          src={ type === 'meal' ? strMealThumb : strDrinkThumb }
          alt={ type === 'meal' ? strMeal : strDrink }
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{type === 'meal' ? strMeal : strDrink}</h1>
        <div data-testid="recipe-category">
          {formatCategoryAndAlcoholicInfo(strCategory, strAlcoholic)}
        </div>
        <ShareButton type={ type } id={ id } testId="share-btn" />
        <FavoriteButton type={ type } id={ id } testId="favorite-btn" />
        <IngredientList ingredients={ ingredients } measures={ measures } />
        <p data-testid="instructions">{strInstructions}</p>
        <button
          type="button"
          onClick={ handleFinishRecipe }
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      </div>
      <Footer />
    </>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['meal', 'drink']).isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipeInProgress;
