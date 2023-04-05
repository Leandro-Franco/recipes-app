import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useRecipeInProgress from '../hooks/useRecipeInProgress';
import ShareButton from '../Components/ShareButton';
import FavoriteButton from '../Components/FavoriteButton';
import IngredientList from '../Components/IngredientList';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { fetchIngredients } from '../Services/ApiRequest';

function RecipeInProgress() {
  const { id, type } = useParams();
  const [recipeInProgress, setRecipeInProgress] = useRecipeInProgress(type, id);
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredientsData = async () => {
      const fetchedIngredients = await fetchIngredients(type === 'meal' ? 's' : '', id);
      setIngredients(fetchedIngredients);
    };
    fetchIngredientsData();
  }, [id, type]);

  if (!recipeInProgress[type] || !recipeInProgress[type][id]) {
    const maxIgredients = 20;
    setRecipeInProgress({
      ...recipeInProgress,
      [type]: {
        ...recipeInProgress[type],
        [id]: Array(maxIgredients).fill(null),
      },
    });
  }

  const handleIngredientCheck = (index) => {
    const updatedRecipeInProgress = {
      ...recipeInProgress,
      [type]: {
        ...recipeInProgress[type],
        [id]: [
          ...recipeInProgress[type][id].slice(0, index),
          !recipeInProgress[type][id][index],
          ...recipeInProgress[type][id].slice(index + 1),
        ],
      },
    };
    setRecipeInProgress(updatedRecipeInProgress);
  };

  const handleFinishRecipe = () => {
    const updatedRecipeInProgress = {
      ...recipeInProgress,
      [type]: {
        ...recipeInProgress[type],
        [id]: [],
      },
    };
    setRecipeInProgress(updatedRecipeInProgress);
    history.push('/done-recipes');
  };

  const {
    strMealThumb,
    strDrinkThumb,
    strMeal,
    strDrink,
    strCategory,
    strAlcoholic,
    strInstructions,
    measures,
  } = recipeInProgress;

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
        <IngredientList
          ingredients={ ingredients }
          measures={ measures }
          checkedIngredients={ recipeInProgress[type]?.[id] ?? [] }
          onIngredientCheck={ handleIngredientCheck }
        />
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

export default RecipeInProgress;
