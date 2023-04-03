import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Verifica a pagina inicial da aplicacao', () => {
  it('Verifica se os inputs sao renderizados', () => {
    render(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
  it('Verifica se ao clicar no botao "Entrar" é redirecionada para a pagina "Meals"', () => {
    render(<App />);
    const button = screen.getAllByRole('button');

    expect(button.length).toBe(1);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, 'tryber@trybe.com');

    userEvent.type(passwordInput, '1234567');

    fireEvent.click(button[0]);

    const route = window.location.pathname;

    expect(route).toBe('/meals');
  });
});
