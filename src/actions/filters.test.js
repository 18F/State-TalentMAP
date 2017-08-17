import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './filters';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const items = [
  {
    item: {
      title: 'Skill code',
      sort: 100,
      description: 'skill',
      endpoint: 'skill/',
      selectionRef: 'skill__code__in',
      text: 'Choose skill codes',
    },
    data: [
    ],
  },
  {
    item: {
      title: 'Grade',
      sort: 300,
      description: 'grade',
      endpoint: 'grade/',
      selectionRef: 'grade__code__in',
      text: 'Choose grades',
    },
    data: [
    ],
  },
  {
    item: {
      title: 'COLA',
      sort: 600,
      bool: true, // use bool: true to share a common HTML template
      description: 'COLA',
      selectionRef: 'post__cost_of_living_adjustment__gt',
      text: 'Include only positions with COLA',
      choices: [
      ],
    },
    data: [
      { code: '0', description: 'Yes' }, // use a code of 0 to specify we want to return results where COLA > 0
    ],
  },
];

const api = 'http://localhost:8000/api/v1';

describe('async actions', () => {
  beforeEach(() => {
    const mockAdapter = new MockAdapter(axios);

    const skills = { count: 2,
      results: [{ id: 2, code: '0010', description: 'EXECUTIVE (PAS)' },
    { id: 3, code: '0020', description: 'EXECUTIVE (CAREER)' }] };

    const grades = { count: 2, results: [{ id: 2, code: '00' }, { id: 3, code: '01' }] };

    mockAdapter.onGet('http://localhost:8000/api/v1/skill/').reply(200,
      skills,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/grade/').reply(200,
      grades,
    );
  });

  it('can fetch filters', (done) => {
    const store = mockStore({ items: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.filtersFetchData(api, items));
        store.dispatch(actions.filtersIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle failed fetches of filters', (done) => {
    const store = mockStore({ items: [] });
    const invalidItems = items.slice(); // copy the items array
    invalidItems[0].item.endpoint = 'invalid'; // actually make one of the endpoints invalid

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.filtersFetchData(api, invalidItems));
        store.dispatch(actions.filtersIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
