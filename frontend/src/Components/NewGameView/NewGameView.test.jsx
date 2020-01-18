import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import NewGameView from './NewGameView';

afterEach(cleanup);

test('renders correctly', () => {
  const component = render(
    <NewGameView />
  );

  expect(component.container).toHaveTextContent(
    'Uusi peli'
  );
});
