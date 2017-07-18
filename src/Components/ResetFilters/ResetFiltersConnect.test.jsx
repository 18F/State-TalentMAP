import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ResetFiltersConnect from './ResetFiltersConnect';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ResetFilters Connected Component', () => {
  beforeEach(() => {
  });

  it('is defined', () => {
    const resetFilters = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <ResetFiltersConnect />
    </MemoryRouter></Provider>);
    expect(resetFilters).toBeDefined();
  });
});
