import { useEffect, useState } from 'react';

function useRecipeInProgress(type, id) {
  const [recipeInProgress, setRecipeInProgress] = useState({});

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes && inProgressRecipes[type] && inProgressRecipes[type][id]) {
      setRecipeInProgress(inProgressRecipes[type][id]);
    } else {
      const initialRecipeInProgress = {
        cocktails: [],
        meals: [],
      };

      initialRecipeInProgress[type] = [
        {
          id,
          inProgress: '',
        },
      ];

      setRecipeInProgress(initialRecipeInProgress);
    }
  }, [id, type]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipeInProgress));
  }, [recipeInProgress]);

  return [recipeInProgress, setRecipeInProgress];
}

export default useRecipeInProgress;
