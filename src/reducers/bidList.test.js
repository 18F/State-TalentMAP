import * as reducers from './bidList';

describe('reducers', () => {
  it('can set reducer BID_LIST_HAS_ERRORED', () => {
    expect(reducers.bidListHasErrored(false, { type: 'BID_LIST_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer BID_LIST_IS_LOADING', () => {
    expect(reducers.bidListIsLoading(false, { type: 'BID_LIST_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer BID_LIST_FETCH_DATA_SUCCESS', () => {
    expect(reducers.bidListFetchDataSuccess(false, { type: 'BID_LIST_FETCH_DATA_SUCCESS', results: true })).toBe(true);
  });

  it('can set reducer BID_LIST_TOGGLE_HAS_ERRORED', () => {
    expect(reducers.bidListToggleHasErrored(false, { type: 'BID_LIST_TOGGLE_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer BID_LIST_TOGGLE_IS_LOADING', () => {
    expect(reducers.bidListToggleIsLoading(false, { type: 'BID_LIST_TOGGLE_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer BID_LIST_TOGGLE_SUCCESS', () => {
    expect(reducers.bidListToggleSuccess(false, { type: 'BID_LIST_TOGGLE_SUCCESS', response: true })).toBe(true);
  });
});
