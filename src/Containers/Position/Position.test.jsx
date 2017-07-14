import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Position from './Position';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Main', () => {
  const api = 'http://localhost:8000/api/v1';

  beforeEach(() => {
  });

  it('is defined', () => {
    const position = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Position api={api} />
    </MemoryRouter></Provider>);
    expect(position).toBeDefined();
  });
});
