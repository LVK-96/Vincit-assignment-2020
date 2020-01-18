import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, waitForElement } from '@testing-library/react';
import App from './App';

jest.mock('./Services/users.jsx');

afterEach(cleanup);

test('renders new game view when local storage is empty', () => {
  const component = render(
    <App />
  );

  expect(component.container).toHaveTextContent(
    'Uusi peli'
  );
});

test('renders on going game view when local storage has id and token', async () => {
  localStorage.setItem('id', 'id');
  localStorage.setItem('token', 'token');
  const component = render(
    <App />
  );

  await waitForElement(
    () => component.container.querySelector('.on-going-game-container')
  );

  expect(component.container).toHaveTextContent(
    'Pelaa'
  );
});
