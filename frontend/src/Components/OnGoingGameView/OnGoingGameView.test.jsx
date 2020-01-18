import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import OnGoingGameView from './OnGoingGameView';

afterEach(cleanup);

test('renders correctly', () => {
  const component = render(
    <OnGoingGameView />
  );

  expect(component.container).toHaveTextContent(
    'Pelaa'
  );

  expect(component.container).toHaveTextContent(
    'Pisteet: '
  );
});
