import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidderPortfolioPage from './BidderPortfolioPage';
import bidderListObject from '../../../__mocks__/bidderListObject';

describe('BidderPortfolioPageComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<BidderPortfolioPage
      bidderPortfolio={bidderListObject}
      bidderPortfolioIsLoading={false}
      bidderPortfolioHasErrored={false}
      pageSize={8}
      queryParamUpdate={() => {}}
      pageNumber={1}
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidderPortfolioPage
      bidderPortfolio={bidderListObject}
      bidderPortfolioIsLoading={false}
      bidderPortfolioHasErrored={false}
      pageSize={8}
      queryParamUpdate={() => {}}
      pageNumber={1}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
