import axios from 'axios';
import queryString from 'query-string';
import api from '../api';
import { fetchUserToken } from '../utilities';
import { BIDDER_PORTFOLIO_PARAM_OBJECTS } from '../Constants/EndpointParams';

export function bidderPortfolioHasErrored(bool) {
  return {
    type: 'BIDDER_PORTFOLIO_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidderPortfolioIsLoading(bool) {
  return {
    type: 'BIDDER_PORTFOLIO_IS_LOADING',
    isLoading: bool,
  };
}
export function bidderPortfolioFetchDataSuccess(results) {
  return {
    type: 'BIDDER_PORTFOLIO_FETCH_DATA_SUCCESS',
    results,
  };
}

export function bidderPortfolioCountsHasErrored(bool) {
  return {
    type: 'BIDDER_PORTFOLIO_COUNTS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidderPortfolioCountsIsLoading(bool) {
  return {
    type: 'BIDDER_PORTFOLIO_COUNTS_IS_LOADING',
    isLoading: bool,
  };
}
export function bidderPortfolioCountsFetchDataSuccess(counts) {
  return {
    type: 'BIDDER_PORTFOLIO_COUNTS_FETCH_DATA_SUCCESS',
    counts,
  };
}

export function bidderPortfolioCountsFetchData() {
  return (dispatch) => {
    dispatch(bidderPortfolioCountsHasErrored(false));
    dispatch(bidderPortfolioCountsIsLoading(true));

    const queryTypes = [
      { name: 'all', query: queryString.stringify(BIDDER_PORTFOLIO_PARAM_OBJECTS.all) },
      { name: 'bidding', query: queryString.stringify(BIDDER_PORTFOLIO_PARAM_OBJECTS.bidding) },
      { name: 'inpanel', query: queryString.stringify(BIDDER_PORTFOLIO_PARAM_OBJECTS.inpanel) },
      { name: 'inpost', query: queryString.stringify(BIDDER_PORTFOLIO_PARAM_OBJECTS.inpost) },
    ];

    // We're just using this query to get the count,
    // so we set a hard limit=1 to reduce response time.
    const queryProms = queryTypes.map(type => axios.get(`${api}/client/?limit=1&${type.query}`, { headers: { Authorization: fetchUserToken() } }));

    Promise.all(queryProms)
      // Promise.all returns a single array which matches the order of the originating array...
      .then((results) => {
        // ...and because of that, we can be sure results[x] aligns with queryTypes[x]
        // and set the relevant resultsType property accordingly
        const countObject = Object.assign({});
        results.forEach((result, i) => {
          countObject[queryTypes[i].name] = result.data.count;
        });
        dispatch(bidderPortfolioCountsHasErrored(false));
        dispatch(bidderPortfolioCountsIsLoading(false));
        dispatch(bidderPortfolioCountsFetchDataSuccess(countObject));
      })
      .catch(() => {
        dispatch(bidderPortfolioCountsHasErrored(true));
        dispatch(bidderPortfolioCountsIsLoading(false));
      });
  };
}

export function bidderPortfolioFetchData(query = '') {
  return (dispatch) => {
    dispatch(bidderPortfolioIsLoading(true));
    dispatch(bidderPortfolioHasErrored(false));
    axios.get(`${api}/client/?${query}`, { headers: { Authorization: fetchUserToken() } })
            .then(({ data }) => {
              dispatch(bidderPortfolioHasErrored(false));
              dispatch(bidderPortfolioIsLoading(false));
              dispatch(bidderPortfolioFetchDataSuccess(data));
            })
            .catch(() => {
              dispatch(bidderPortfolioHasErrored(true));
              dispatch(bidderPortfolioIsLoading(false));
            });
  };
}
