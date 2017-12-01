import setupAsyncMocks from './setupAsyncMocks';
import * as actions from './bidderPortfolio';
import bidderListObject from '../__mocks__/bidderListObject';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('bidderPortfolio async actions', () => {
  beforeEach(() => {
    mockAdapter.onGet('http://localhost:8000/api/v1/client/?').reply(200,
      bidderListObject,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/client/?limit=1&bidding=true').reply(200,
      bidderListObject,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/client/?limit=1&inpanel=true').reply(200,
      bidderListObject,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/client/?limit=1&inpost=true').reply(200,
      bidderListObject,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/client/?limit=1&').reply(200,
      bidderListObject,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/client/?q=failure').reply(404,
      null,
    );
  });

  it("can fetch a CDO's client/bidder list", (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidderPortfolioFetchData());
        store.dispatch(actions.bidderPortfolioIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it("can handle failures when fetching a CDO's client/bidder list", (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidderPortfolioFetchData('q=failure'));
        store.dispatch(actions.bidderPortfolioIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can fetch the counts of different portfolio queries', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidderPortfolioCountsFetchData());
        store.dispatch(actions.bidderPortfolioCountsIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle failures when fetching the counts of different portfolio queries', (done) => {
    const store = mockStore({ results: [] });

    // reset() so that http requests fail.
    mockAdapter.reset();

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidderPortfolioCountsFetchData());
        store.dispatch(actions.bidderPortfolioCountsIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
