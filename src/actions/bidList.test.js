import setupAsyncMocks from './setupAsyncMocks';
import * as actions from './bidList';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  const bidList = {
    count: 2,
    next: null,
    previous: null,
    results: [
      {
        id: 4,
        bidcycle: 'Test bid cycle (1988-01-01 - 2088-01-01)',
        user: 'admin',
        position: '[00003026] OMS (COM) (Freetown, Sierra Leone)',
        status: 'draft',
        submission_date: null,
      },
      {
        id: 5,
        bidcycle: 'Test bid cycle (1988-01-01 - 2088-01-01)',
        user: 'admin',
        position: '[00004013] OMS (COM) (Maseru, Lesotho)',
        status: 'draft',
        submission_date: null,
      },
    ],
  };

// reset the mockAdapter since we repeat specific requests
  beforeEach(() => {
    mockAdapter.reset();
  });

  it('can fetch a bid list', (done) => {
    const store = mockStore({ });

    mockAdapter.onGet('http://localhost:8000/api/v1/bidlist/').reply(200,
      bidList,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidListFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching a bid list', (done) => {
    const store = mockStore({ });

    mockAdapter.onGet('http://localhost:8000/api/v1/bidlist/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidListFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('can remove a position from the bid list', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.onDelete('http://localhost:8000/api/v1/bidlist/position/1/').reply(204,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.toggleBidPosition('1', true));
        done();
      }, 0);
    };
    f();
  });

  it('can add a position to the bid list', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.onPut('http://localhost:8000/api/v1/bidlist/position/1/').reply(204,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.toggleBidPosition('1'));
        done();
      }, 0);
    };
    f();
  });

  it('can submit a bid', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.onPut('http://localhost:8000/api/v1/bidlist/bid/1/submit/').reply(204,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.submitBid('1'));
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when submitting a bid', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.onPut('http://localhost:8000/api/v1/bidlist/bid/1/submit/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.submitBid('1'));
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when adding a position to the bid list', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.onPut('http://localhost:8000/api/v1/bidlist/position/1/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.toggleBidPosition('1'));
        done();
      }, 0);
    };
    f();
  });
});
