import { take, call, put, cancelled, race } from 'redux-saga/effects';
import axios from 'axios';

import { push } from 'react-router-redux';

import api from '../api';

// Our login constants
import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUESTING,
  LOGOUT_SUCCESS,
} from './constants';

// So that we can modify our Client piece of state
import {
  setClient,
  unsetClient,
} from '../client/actions';

// So that we can pull the user's profile
// and unset the profile object on logout
import {
  userProfileFetchData,
  unsetUserProfile,
} from '../actions/userProfile';

// We'll also clear any notifications on logout
import {
  unsetNotificationsCount,
} from '../actions/notifications';

const loginUrl = `${api}/accounts/token/`;

export const errorMessage = { message: null };

export function changeErrorMessage(e) {
  errorMessage.message = e;
}

export function loginApi(username, password) {
  if (!username || !password) {
    return changeErrorMessage('Fields cannot be blank');
  }
  return axios.post(loginUrl, { username, password })
    .then(response => response.data.token)
    .catch((error) => { changeErrorMessage(error.message); });
}

function* logout() {
  // dispatches the CLIENT_UNSET action
  yield put(unsetClient());

  // unset the user profile
  yield put(unsetUserProfile());

  // unset notifications count
  yield put(unsetNotificationsCount());

  // remove our token
  sessionStorage.removeItem('token');

  // .. inform redux that our logout was successful
  yield put({ type: LOGOUT_SUCCESS });

  // redirect to the /login screen
  yield put(push('/login'));
}

function* loginFlow(username, password) {
  // try to call to our loginApi() function.  Redux Saga
  // will pause here until we either are successful or
  // receive an error
  const token = yield call(loginApi, username, password);

  if (token) {
    // inform Redux to set our client token
    yield put(setClient(token));

    // also inform redux that our login was successful
    yield put({ type: LOGIN_SUCCESS });

    // set a stringified version of our token to sessionStorage on our domain
    sessionStorage.setItem('token', JSON.stringify(token));

    // get the user's profile data
    yield put(userProfileFetchData());

    // redirect them to home
    yield put(push('/'));
  } else {
    // error? send it to redux
    yield put({ type: LOGIN_ERROR, error: errorMessage.message });
  }
  if (yield cancelled()) {
    push('/login');
  }

  // return the token for health and wealth
  return token;
}

// Our watcher (saga).  It will watch for many things.
function* loginWatcher() {
  // Check if user entered already logged in or not
  while (true) { // eslint-disable-line no-constant-condition
    const { loggingIn } = yield race({
      loggingIn: take(LOGIN_REQUESTING),
      loggingOut: take(LOGOUT_REQUESTING),
    });

    if (loggingIn) {
      // grab username and password
      const { username, password } = loggingIn;

      // attempt log in
      yield call(loginFlow, username, password);
    } else {
      // log out
      yield call(logout);
    }
  }
}

export default loginWatcher;
