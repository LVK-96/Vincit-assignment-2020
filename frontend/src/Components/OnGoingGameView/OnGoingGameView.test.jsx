import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import OnGoingGameView from './OnGoingGameView';

jest.mock('../../Services/game.jsx');

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

test('snapshot test', () => {
  const component = renderer.create(
    <OnGoingGameView />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
