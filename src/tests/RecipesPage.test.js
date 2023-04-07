import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Meals from '../Pages/Meals';
import Drinks from '../Pages/Drinks';
import ProviderFilter from '../Contexts/ProviderFilter';
import { getMealsCategories, getMealsRecipes, getDrinksCategories, getDrinksRecipes } from '../Services/ApiRequest';
import Recipes from '../Components/Recipes';

const apiRequesting = '../Services/ApiRequest';
jest.mock(apiRequesting);

describe('Verifica a página de receitas da aplicação', () => {
  const mealRecipes = [
    {
      idMeal: '52977',
      strMeal: 'Corba',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      idMeal: '53060',
      strMeal: 'Burek',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    },
  ];
  const mealCategories = [
    {
      strCategory: 'Beek',
    },
    {
      strCategory: 'Breakfast',
    },
  ];

  const drinkCategories = [
    {
      strCategory: 'Ordinary Drink',
    },
    {
      strCategory: 'Cocktail',
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockedGetMealsCategories = jest.fn(() => Promise.resolve([
    { strCategory: 'Beef' },
    { strCategory: 'Breakfast' },
    { strCategory: 'Chicken' },
    { strCategory: 'Dessert' },
  ]));
  const mockedGetMealsRecipes = jest.fn(() => Promise.resolve([
    { idMeal: '52977', strMeal: 'Corba', strCategory: 'Side' },
    { idMeal: '53060', strMeal: 'Burek', strCategory: 'Side' },
  ]));
  jest.mock(apiRequesting, () => ({
    getMealsCategories: mockedGetMealsCategories,
    getMealsRecipes: mockedGetMealsRecipes,
  }));

  const mockedGetDrinksCategories = jest.fn(() => Promise.resolve([
    { strCategory: 'Ordinary Drink' },
    { strCategory: 'Cocktail' },
    { strCategory: 'Shake' },
    { strCategory: 'Other / Unknown' },
  ]));
  const mockedGetDrinksRecipes = jest.fn(() => Promise.resolve([
    { idDrink: '178317', strDrink: /Bee's Knees/i, strCategory: 'Side' },
    { idDrink: '13066', strDrink: /Bruce's Puce/i, strCategory: 'Side' },
  ]));
  jest.mock(apiRequesting, () => ({
    getDrinksCategories: mockedGetDrinksCategories,
    getDrinksRecipes: mockedGetDrinksRecipes,
  }));

  it('Verifica se renderiza as categorias e receitas na página Meals', async () => {
    render(
      <ProviderFilter>
        <Meals />
      </ProviderFilter>,
    );

    await waitFor(() => {
      const categoryFilter = screen.getByTestId(/category-filter/i);

      expect(categoryFilter).toBeInTheDocument();
    }, { timeout: 5000 });
  }, 20000);

  it('Verifica se renderiza os botões', async () => {
    render(
      <ProviderFilter>
        <Recipes path="Meals" recipes={ mealRecipes } categories={ mealCategories } />
      </ProviderFilter>,
    );
    await waitFor(() => {
      const beefButton = screen.getByTestId('Beek-category-filter');
      expect(beefButton).toBeInTheDocument();

      const breakfastButton = screen.getByTestId('Breakfast-category-filter');
      expect(breakfastButton).toBeInTheDocument();
    }, { timeout: 20000 });
  }, 20000);

  it('Verifica a renderização das receitas', async () => {
    render(
      <ProviderFilter>
        <Recipes path="Meals" recipes={ mealRecipes } categories={ mealCategories } />
      </ProviderFilter>,
    );

    await waitFor(() => {
      const gridRecipe = screen.getByTestId('recipes-grid');
      expect(gridRecipe).toBeInTheDocument();
    }, { timeout: 20000 });
  }, 20000);

  // it('Verifica o filtro por categoria', async () => {
  //   jest.setTimeout(60000);
  //   const mockedGetMealsCategories = jest.fn(() => Promise.resolve({
  //     filter: [
  //       {
  //         idMeal: '52977',
  //         strMeal: 'Corba',
  //         strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  //       },
  //     ],
  //   }));
  //   jest.mock(apiRequesting, () => ({
  //     getMealsCategories: mockedGetMealsCategories,
  //   }));

  //   render(
  //     <ProviderFilter>
  // <Recipes path="Meals" recipes={ mealRecipes } categories={ mealCategories } />
  //     </ProviderFilter>,
  //   );

  //   await waitFor(() => {
  //     const receita1 = screen.getByTestId('0-card-name');
  //     expect(receita1).toBeInTheDocument();

  //     fireEvent.click(receita1);
  //     const corbaMeal = screen.getByTestId('recipe-title');

  //     expect(corbaMeal).toBeInTheDocument();
  //     expect(mockedGetMealsCategories).toHaveBeenCalled();
  //     expect(mockedGetMealsCategories).toHaveBeenCalledWith(
  //       'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  //       'Meals',
  //     );
  //   }, { timeout: 50000 });
  // }, 50000);

  it('Verifica se ao clicar na receita a rota é o detalhe da receita', async () => {
    const history = createMemoryHistory();

    render(
      <ProviderFilter>
        <Router history={ history }>
          <Recipes path="Meals" recipes={ mealRecipes } categories={ mealCategories } />
        </Router>
        ,
      </ProviderFilter>,
    );

    await waitFor(() => {
      const receita1 = screen.getByTestId('0-card-name');
      expect(receita1).toBeInTheDocument();

      fireEvent.click(receita1);

      const route = history.location.pathname;
      expect(route).toBe('/meals/52977');
    }, { timeout: 20000 });
  }, 20000);

  it('Verifica se todas as receitas aparecem quando a categoria All é clicada', async () => {
    render(
      <ProviderFilter>
        <Recipes path="Meals" recipes={ mealRecipes } categories={ mealCategories } />
      </ProviderFilter>,
    );
    await waitFor(() => {
      const allButton = screen.getByTestId('All-category-filter');
      fireEvent.click(allButton);
    }, { timeout: 20000 });
  }, 20000);

  // DRINKS:

  it('Verifica se renderiza as categorias e receitas na página Drinks', async () => {
    render(
      <ProviderFilter>
        <Drinks />
      </ProviderFilter>,
    );

    await waitFor(() => {
      const categoryFilter = screen.getByTestId(/category-filter/i);

      expect(categoryFilter).toBeInTheDocument();
    }, { timeout: 10000 });
  }, 20000);

  it('Verifica se renderiza os botões da Drinks', async () => {
    render(
      <ProviderFilter>
        <Recipes path="Drinks" categories={ drinkCategories } />
      </ProviderFilter>,
    );
    await waitFor(() => {
      const ordinaryBtn = screen.getByTestId(/Ordinary Drink-category-filter/i);
      expect(ordinaryBtn).toBeInTheDocument();

      const cocktailBtn = screen.getByTestId(/Cocktail-category-filter/i);
      expect(cocktailBtn).toBeInTheDocument();
    }, { timeout: 20000 });
  }, 20000);

  it('Verifica a renderização das receitas da Drinks', async () => {
    render(
      <ProviderFilter>
        <Recipes path="Drinks" categories={ drinkCategories } />
      </ProviderFilter>,
    );

    await waitFor(() => {
      const gridRecipe = screen.getByTestId('recipes-grid');
      expect(gridRecipe).toBeInTheDocument();
    }, { timeout: 20000 });
  }, 20000);

  it('Verifica se ao clicar na receita a rota é o detalhe da receita de Drinks', async () => {
    const history = createMemoryHistory();

    render(
      <ProviderFilter>
        <Router history={ history }>
          <Recipes path="Drinks" categories={ drinkCategories } />
        </Router>
        ,
      </ProviderFilter>,
    );

    await waitFor(() => {
      const receita1 = screen.getByTestId('0-card-name');
      expect(receita1).toBeInTheDocument();

      fireEvent.click(receita1);

      const route = history.location.pathname;
      expect(route).toBe('drinks/15997');
    }, { timeout: 20000 });
  }, 20000);

  it('Verifica se todas as receitas aparecem quando a categoria All é clicada em Drinks', async () => {
    render(
      <ProviderFilter>
        <Recipes path="Drinks" categories={ drinkCategories } />
      </ProviderFilter>,
    );
    await waitFor(() => {
      const allButton = screen.getByTestId('All-category-filter');
      fireEvent.click(allButton);
    }, { timeout: 20000 });
  }, 20000);
});
