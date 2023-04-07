import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import RecipeInProgress from '../Pages/RecipeInProgress';

describe('RecipeInProgress component', () => {
  it('deve renderizar corretamente na tela', () => {
    const mockedRecipeInProgress = {
      meal: {
        52771: {
          strMeal: 'Spicy Arrabiata Penne',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
          strCategory: 'Vegetarian',
          strArea: 'Italian',
          strInstructions: 'Put a large saucepan of water on to boil.',
          ingredients: [
            'penne rigate',
            'olive oil',
            'garlic',
            'chopped tomatoes',
            'red chile flakes',
            'fresh basil',
          ],
          measures: [
            '1 pound',
            '1/4 cup',
            '3 cloves',
            '1 tin ',
            '1/2 teaspoon',
            '1/2 cup',
          ],
          52772: [true, false, true, true, false, false],
        },
      },
      drink: {},
    };

    render(
      <MemoryRouter initialEntries={ [`/in-progress/${mockedRecipeInProgress.meal['52771'].idMeal}/meal`] }>
        <Route path="/in-progress/:id/:type" component={ RecipeInProgress } />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('recipe-title')).toHaveTextContent('Spicy Arrabiata Penne');
    expect(screen.getByTestId('recipe-category')).toHaveTextContent('Vegetarian');
    expect(screen.getByTestId('instructions')).toHaveTextContent('Put a large saucepan of water on to boil.');
  });
});
