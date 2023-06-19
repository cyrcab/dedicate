import React from 'react';
import { test } from '@jest/globals';
import renderer from 'react-test-renderer';
import App from './App';

test('renders learn react link', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const component = renderer.create(<App />);
});
