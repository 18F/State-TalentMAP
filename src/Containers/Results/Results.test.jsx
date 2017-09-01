import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import Results from './Results';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Results', () => {
  it('is defined', () => {
    const results = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Results isAuthorized={() => true} onNavigateTo={() => {}} setAccordion={() => {}} />
    </MemoryRouter></Provider>);
    expect(results).toBeDefined();
  });

  it('can handle authentication redirects', () => {
    const results = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Results isAuthorized={() => false} onNavigateTo={() => {}} setAccordion={() => {}} />
    </MemoryRouter></Provider>);
    expect(results).toBeDefined();
  });

  it('can call the onQueryParamUpdate function', () => {
    const query = 'ordering=bureau&q=German';
    const wrapper = shallow(
      <Results.WrappedComponent
        isAuthorized={() => true}
        fetchData={() => {}}
        onNavigateTo={() => {}}
        fetchFilters={() => {}}
        setAccordion={() => {}}
      />,
    );
    // define the instance
    const instance = wrapper.instance();
    // spy the onQueryParamUpdate function
    const handleUpdateSpy = sinon.spy(instance, 'onQueryParamUpdate');
    wrapper.instance().context.router = { history: { push: () => {} } };
    wrapper.instance().onQueryParamUpdate(query);
    sinon.assert.calledOnce(handleUpdateSpy);
  });

  it('can call the resetFilters function', () => {
    const wrapper = shallow(
      <Results.WrappedComponent
        isAuthorized={() => true}
        fetchData={() => {}}
        onNavigateTo={() => {}}
        fetchFilters={() => {}}
        setAccordion={() => {}}
      />,
    );
    // define the instance
    const instance = wrapper.instance();
    // spy the onQueryParamUpdate function
    const handleUpdateSpy = sinon.spy(instance, 'resetFilters');
    wrapper.instance().context.router = { history: { push: () => {} } };
    wrapper.instance().resetFilters();
    sinon.assert.calledOnce(handleUpdateSpy);
  });

  it('can call the onQueryParamToggle function', () => {
    const wrapper = shallow(
      <Results.WrappedComponent
        isAuthorized={() => true}
        fetchData={() => {}}
        onNavigateTo={() => {}}
        fetchFilters={() => {}}
        setAccordion={() => {}}
      />,
    );
    const history = { value: { search: null } };
    // define the instance
    const instance = wrapper.instance();
    // spy the onQueryParamUpdate function
    const handleUpdateSpy = sinon.spy(instance, 'onQueryParamToggle');
    wrapper.instance().context.router = { history: { push: (h) => { history.value = h; } } };
    wrapper.instance().state.query.value = 'language=1%2C2&ordering=bureau&q=German&skill=1';
    wrapper.instance().onQueryParamToggle('language', '1');
    sinon.assert.calledOnce(handleUpdateSpy);
    // remove the skill
    wrapper.instance().onQueryParamToggle('skill', '1', true);
    // make sure the skill was removed
    expect(history.value.search).toBe('language=1%2C2&ordering=bureau&q=German');
  });

  it('can call the onQueryParamToggle function and handle removing non-existent params', () => {
    const wrapper = shallow(
      <Results.WrappedComponent
        isAuthorized={() => true}
        fetchData={() => {}}
        onNavigateTo={() => {}}
        fetchFilters={() => {}}
        setAccordion={() => {}}
      />,
    );
    const history = { value: { search: null } };
    wrapper.instance().context.router = { history: { push: (h) => { history.value = h; } } };
    wrapper.instance().state.query.value = 'language=1&ordering=bureau&q=German&skill=1';
    wrapper.instance().onQueryParamToggle('skill', '2', true);
    // There wasn't a change, so we should refresh the page - i.e., value.search
    // shouldn't change.
    expect(history.value.search).toBe(null);
  });
});
