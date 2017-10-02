import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import FavoritePositions from './FavoritePositions';
import resultsObject from '../../__mocks__/resultsObject';

describe('FavoritePositionsComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <FavoritePositions
        favorites={resultsObject}
        toggleFavorite={() => {}}
        toggleFavoritePositionIsLoading={false}
        toggleFavoritePositionHasErrored={false}
        favoritePositionsIsLoading={false}
        favoritePositionsHasErrored={false}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <FavoritePositions
        favorites={resultsObject}
        toggleFavorite={() => {}}
        toggleFavoritePositionIsLoading
        toggleFavoritePositionHasErrored={false}
        favoritePositionsIsLoading
        favoritePositionsHasErrored={false}
      />,
    );
    expect(wrapper.instance().props.favorites).toBe(resultsObject);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <FavoritePositions
        favorites={resultsObject}
        toggleFavorite={() => {}}
        toggleFavoritePositionIsLoading={false}
        toggleFavoritePositionHasErrored={false}
        favoritePositionsIsLoading={false}
        favoritePositionsHasErrored={false}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
