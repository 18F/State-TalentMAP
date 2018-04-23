import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import CompareList from './CompareList';
import resultsObject from '../../__mocks__/resultsObject';

describe('CompareListComponent', () => {
  const props = {
    goBackLink: { text: 'Go back to search results' },
  };
  it('is defined', () => {
    const wrapper = shallow(<CompareList {...props} compare={resultsObject.results} />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(<CompareList {...props} compare={resultsObject.results} />);
    expect(wrapper.instance().props.compare[0].id).toBe(6);
  });

  it('displays the comparison list when isLoading is false', () => {
    const wrapper = shallow(
      <CompareList {...props} compare={resultsObject.results} isLoading={false} />);
    expect(wrapper.find('.comparison-table-container').exists()).toBe(true);
    expect(wrapper.find('Spinner').exists()).toBe(false);
  });

  it('displays the Spinner when isLoading is true', () => {
    const wrapper = shallow(<CompareList {...props} compare={resultsObject.results} isLoading />);
    expect(wrapper.find('.comparison-table-container').exists()).toBe(false);
    expect(wrapper.find('Spinner').exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<CompareList {...props} compare={resultsObject.results} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when there is an obc id', () => {
    const resultsWithObc = { ...resultsObject };
    resultsWithObc.results[0].post.obc_id = 1;
    const wrapper = shallow(<CompareList {...props} compare={resultsWithObc.results} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isLoading is true', () => {
    const wrapper = shallow(<CompareList {...props} compare={resultsObject.results} isLoading />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
