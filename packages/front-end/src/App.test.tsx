import React from 'react';
import { expect, jest, test } from '@jest/globals';
import renderer from 'react-test-renderer';
import App from './App';

test('renders learn react link', () => {
  const component = renderer.create(<App />);
});
