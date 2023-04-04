import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Meals from '../Pages/Meals';
// import App from '../App';

describe('Verifica o Header da aplicação', () => {
  it('Verifica se o componente Header é renderizado na página /meals', () => {
    render(<Meals />);

    const header = screen.getByTestId('header-component');
    expect(header).toBeInTheDocument();
  });
  it('Verifica se os inputs sao renderizados', () => {
    render(<Meals />);

    const lupaBtn = screen.getByTestId('search-top-btn');
    const profileBtn = screen.getByTestId('profile-top-btn');

    expect(lupaBtn).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botao de busca aparece o input de texto', () => {
    render(<Meals />);

    const lupaBtn = screen.getByTestId('search-top-btn');

    expect(lupaBtn).toBeInTheDocument();

    userEvent.click(lupaBtn);

    const searchInput = screen.getByTestId('search-input');

    expect(searchInput).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botao de perfil a rota é /profile', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Meals />
      </Router>,
    );

    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();

    fireEvent.click(profileBtn);

    const route = history.location.pathname;
    expect(route).toBe('/profile');
  });

  //   it(
  //     'Será validado se o componente Header é renderizado na página /profile',
  //     async () => {
  //       renderPath('/profile');

  //       await waitFor(
  //         () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
  //         { timeout: 3000 },
  //       );

  //       expect(screen.getByTestId('header-component')).toBeInTheDocument();
  //     },
  //   );

  //   it(
  //     'Será validado se o componente Header é renderizado na página /profile/edit',
  //     async () => {
  //       renderPath('/profile/edit');

  //       await waitFor(
  //         () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
  //         { timeout: 3000 },
  //       );

//       expect(screen.getByTestId('header-component')).toBeInTheDocument();
//     },
//   );
});
