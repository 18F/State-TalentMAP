import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import ResultsList from './ResultsList';
import resultsObject from '../../__mocks__/resultsObject';

describe('ResultsListComponent', () => {
  let results = null;
  let wrapper = null;

  beforeEach(() => {
    results = TestUtils.renderIntoDocument(<MemoryRouter>
      <ResultsList results={resultsObject} />
    </MemoryRouter>);
  });

  it('is defined', () => {
    expect(results).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(<ResultsList results={resultsObject} />);
    expect(wrapper.instance().props.results.results[0].id).toBe(6);
  });

  it('can call the onChildToggle function', () => {
    wrapper = shallow(<ResultsList results={resultsObject} />);
    // define the instance
    const instance = wrapper.instance();
    // spy the logout function
    const handleClickSpy = sinon.spy(instance, 'onChildToggle');
    wrapper.instance().onChildToggle();
    sinon.assert.calledOnce(handleClickSpy);
  });
});
