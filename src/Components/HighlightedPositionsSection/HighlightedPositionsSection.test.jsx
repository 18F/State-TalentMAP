import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import HighlightedPositionsSection from './HighlightedPositionsSection';
import resultsObject from '../../__mocks__/resultsObject';

describe('HighlightedPositionsSectionComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <HighlightedPositionsSection
        positions={resultsObject.results}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <HighlightedPositionsSection
        positions={resultsObject.results}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
      />,
    );
    expect(wrapper.instance().props.positions[0].id).toBe(resultsObject.results[0].id);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <HighlightedPositionsSection
        positions={resultsObject.results}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
