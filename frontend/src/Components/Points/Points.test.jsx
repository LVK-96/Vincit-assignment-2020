import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import Points from './Points';

afterEach(cleanup);

test('renders correctly', () => {
  const component = render(
    <Points points={20} />
  );

  expect(component.container).toHaveTextContent(
    'Pisteet: 20'
  );
});
