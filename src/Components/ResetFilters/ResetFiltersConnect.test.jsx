import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ResetFiltersConnect from './ResetFiltersConnect';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ResetFilters Connected Component', () => {
  it('is defined', () => {
    const resetFilters = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <ResetFiltersConnect />
    </MemoryRouter></Provider>);
    expect(resetFilters).toBeDefined();
  });

  it('can call the onChildToggle function', () => {
    const wrapper = shallow(
      <ResetFiltersConnect.WrappedComponent onNavigateTo={() => {}} />,
    );
    wrapper.instance().onChildToggle();
  });
});
