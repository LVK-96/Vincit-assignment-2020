import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import GameMessage from './GameMessage';

afterEach(cleanup);

test('renders correctly', () => {
  const component = render(
    <GameMessage message={'test'} />
  );

  expect(component.container).toHaveTextContent(
    'test'
  );
});
