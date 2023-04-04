import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Profile from '../Pages/Profile';

describe('Profile component', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: 'user@test.com' }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve renderizar o e-mail do usuário', () => {
    render(<Profile />);
    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail).toBeInTheDocument();
    expect(userEmail.textContent).toBe('user@test.com');
  });

  it('deve redirecionar para a página de receitas favoritas', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('deve redirecionar para a página de receitas prontas', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const favoriteBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(favoriteBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('deve sair e redirecionar para a página de login', () => {
    const history = createMemoryHistory();
    localStorage.setItem('mealsToken', 'token');
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
    expect(localStorage.getItem('user')).toBe(null);
    expect(localStorage.getItem('mealsToken')).toBe(null);
  });
});
