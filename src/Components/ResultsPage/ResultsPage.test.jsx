import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import ResultsPage from './ResultsPage';
import { POSITION_SEARCH_SORTS, POSITION_PAGE_SIZES } from '../../Constants/Sort';

describe('ResultsPageComponent', () => {
  let wrapper = null;

  const resultsArray = {
    count: 2,
    results: [
      { id: 6,
        grade: '05',
        skill: 'OFFICE MANAGEMENT (9017)',
        bureau: '150000',
        organization: 'YAOUNDE CAMEROON (YAOUNDE)',
        position_number: '00025003',
        is_overseas: true,
        create_date: '2006-09-20',
        update_date: '2017-06-08',
        post: { id: 162, tour_of_duty: '2YRR', code: 'LT6000000', location: 'MASERU, LESOTHO', cost_of_living_adjustment: 0, differential_rate: 15, danger_pay: 0, rest_relaxation_point: 'London', has_consumable_allowance: false, has_service_needs_differential: false },
        languages: [
        { id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' },
        ],
      },
      { id: 60,
        grade: '03',
        skill: 'OFFICE MANAGEMENT (9017)',
        bureau: '150000',
        organization: 'YAOUNDE CAMEROON (YAOUNDE)',
        position_number: '00025003',
        is_overseas: true,
        create_date: '2006-09-20',
        update_date: '2017-06-08',
        post: null,
        languages: [],
      },
    ],
  };

  const defaultSort = '';
  const defaultPageSize = '';

  it('is defined', () => {
    wrapper = shallow(<ResultsPage
      results={resultsArray}
      hasErrored
      isLoading={false}
      sortBy={POSITION_SEARCH_SORTS}
      defaultSort={defaultSort}
      pageSizes={POSITION_PAGE_SIZES}
      defaultPageSize={defaultPageSize}
      onQueryParamUpdate={() => {}}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(<ResultsPage
      results={resultsArray}
      hasErrored
      isLoading={false}
      sortBy={POSITION_SEARCH_SORTS}
      defaultSort={defaultSort}
      pageSizes={POSITION_PAGE_SIZES}
      defaultPageSize={defaultPageSize}
      onQueryParamUpdate={() => {}}
    />);
    expect(wrapper.instance().props.results.results[0].id).toBe(6);
  });

  it('can receive props', () => {
    wrapper = shallow(<ResultsPage
      hasErrored={false}
      isLoading={false}
      sortBy={POSITION_SEARCH_SORTS}
      defaultSort={defaultSort}
      pageSizes={POSITION_PAGE_SIZES}
      defaultPageSize={defaultPageSize}
      onQueryParamUpdate={() => {}}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can call the onChildToggle function', () => {
    wrapper = shallow(<ResultsPage
      results={resultsArray}
      sortBy={POSITION_SEARCH_SORTS}
      defaultSort={defaultSort}
      pageSizes={POSITION_PAGE_SIZES}
      defaultPageSize={defaultPageSize}
      onQueryParamUpdate={() => {}}
    />);
    wrapper.instance().onChildToggle();
    expect(wrapper).toBeDefined();
  });

  it('can call the queryParamUpdate function', () => {
    wrapper = shallow(<ResultsPage
      results={resultsArray}
      sortBy={POSITION_SEARCH_SORTS}
      defaultSort={defaultSort}
      pageSizes={POSITION_PAGE_SIZES}
      defaultPageSize={defaultPageSize}
      queryParamUpdate={() => {}}
    />);
    // define the instance
    const instance = wrapper.instance();
    // spy the queryParamUpdate function
    const handleUpdateSpy = sinon.spy(instance, 'queryParamUpdate');
    wrapper.instance().queryParamUpdate();
    sinon.assert.calledOnce(handleUpdateSpy);
  });
});
