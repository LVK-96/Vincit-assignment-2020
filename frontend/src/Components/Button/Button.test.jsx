import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Button from './Button';

afterEach(cleanup);

test('renders correctly when not visible', () => {
  const component = render(
    <Button text={'test'} />
  );

  expect(component.container).toHaveTextContent(
    ''
  );
});

test('renders correctly when visible', () => {
  const component = render(
    <Button text={'test'} visible />
  );

  expect(component.container).toHaveTextContent(
    'test'
  );
});

test('clicking button calls event handler', () => {
  const mockHandler= jest.fn();
  const component = render(
    <Button text={'test'} handleClick={mockHandler} visible />
  );

  const button = component.getByText('test');
  fireEvent.click(button);
  expect(mockHandler.mock.calls.length).toBe(1);
});
