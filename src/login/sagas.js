import { isObject, merge } from 'lodash';
import { take, call, put, cancelled, race } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import api from '../api';
import { unsetNotificationsCount } from '../actions/notifications';
import { userProfileFetchData, unsetUserProfile } from '../actions/userProfile';
import { setClient, unsetClient } from '../client/actions';
import isCurrentPath from '../Components/ProfileMenu/navigation';
import { redirectToLogout, redirectToLogin } from '../utilities';
import { authError, authRequest, authSuccess, tokenValidationRequest } from './actions';

// Our login constants
import {
  LOGIN_REQUESTING,
  LOGOUT_REQUESTING,
  TOKEN_VALIDATION_REQUESTING,
} from './constants';

/**
 * Utilities
 */
export function getError(e) {
  // Supports error messages or error objects
  if (isObject(e)) {
    return merge({
      message: null,
    }, e);
  }
  return {
    message: (e || ''),
  };
}

export const auth = {
  get: () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      return token;
    } catch (error) {
      // If token exists and is bad (maybe user injected)
      // Drop the token anyways just so we can have the container render login directly
      auth.reset();
      return false;
    }
  },

  set: (token) => {
    // set a stringified version of our token to localstorage
    localStorage.setItem('token', JSON.stringify(token));
  },

  reset: () => {
    // remove our local storage token
    localStorage.removeItem('token');
  },

  /**
   * Auth/Login Mode
   *   @Values 'saml'|'basic'
   *   @Default 'basic' (username/password)
   */
  mode: () => (process.env.LOGIN_MODE || 'basic'),
  isBasicAuth: () => (auth.mode() === 'basic'),
  isSAMLAuth: () => (auth.mode() !== 'basic'),
};

/**
 * API Requests
 */
 // This creates short chainable axios object similar to Observables.map()
 // Mainly so we can do some data pre-processing first for sake of reusability
export const requests = {
  basic: ({ username, password }) => {
    if (!username || !password) {
      return Promise.reject(
        new Error('Fields cannot be blank'),
      );
    }

    return api.post('/accounts/token/', { username, password });
  },

  saml: (token) => {
    if (!token) {
      return Promise.reject(
        new Error('Token cannot be blank'),
      );
    }

    const headers = { Authorization: `Token ${token}` };
    // This is to have one uniform api response from basic and saml api calls
    // So this is to transform the request before the caller gets it
    return api.get('/profile/', { headers });
  },
};

function loginRequest(credentials) {
  const request = requests[auth.isSAMLAuth() ? 'saml' : 'basic'](credentials);
  return request
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

/**
 * Sagas
 */
export function* login(credentials = {}) {
  const isSAML = auth.isSAMLAuth();
  let token = credentials;

  // Determine between basic and saml auth
  if (isSAML && isObject(token)) {
    token = {
      username: token.username,
      password: token.password,
    };
  }

  if (isSAML) {
    yield put(tokenValidationRequest(credentials));
  } else {
    yield put(authRequest(true, credentials.username, credentials.password));
  }

  // try to call to our loginApi() function. Redux Saga will pause
  // here until we either are successful or receive an error
  const { response, error } = yield call(loginRequest, token);

  if (response) {
    token = response.data.token;

    // inform Redux to set our client token
    yield put(setClient(token));
    // also inform redux that our login was successful
    yield put(authSuccess());
    // get the user's profile data
    yield put(userProfileFetchData());

    auth.set(token);

    // redirect them to home
    yield put(push('/'));
  } else {
    yield put(authError(true, error.message));
  }

  if (yield cancelled()) {
    redirectToLogin();
  }

  // return the token for health and wealth
  return token;
}

function* logout() {
  // dispatches the CLIENT_UNSET action
  yield put(unsetClient());
  // unset the user profile
  yield put(unsetUserProfile());
  // unset notifications count
  yield put(unsetNotificationsCount());

  // remove our token
  auth.reset();

  // .. inform redux that our logout was successful
  yield put(authSuccess(false));

  redirectToLogout();
  // Check if the user is already on the login page. We don't want a race
  // condition to infinitely loop them back to the login page, should
  // any requests be made that result in 401
  const isOnLoginPage = isCurrentPath(window.location.pathname, '/login');

  // redirect to the /login screen
  if (!isOnLoginPage) {
    yield put(push('/login'));
  }
}

// Our watcher (saga).  It will watch for many things.
function* loginWatcher() {
  const evaluate = true;
  // Check if user entered already logged in or not
  while (evaluate) {
    const isSAML = auth.isSAMLAuth();
    const races = {
      loggingIn: take(isSAML ? TOKEN_VALIDATION_REQUESTING : LOGIN_REQUESTING),
      loggingOut: take(LOGOUT_REQUESTING),
    };

    const { loggingIn } = yield race(races);

    if (loggingIn) {
      if (isSAML) {
        yield call(login, loggingIn.token);
      } else {
        const credentials = {
          username: loggingIn.username,
          password: loggingIn.password,
        };

        yield call(login, credentials);
      }
    } else {
      // log out
      yield call(logout);
    }
  }
}

export default loginWatcher;
