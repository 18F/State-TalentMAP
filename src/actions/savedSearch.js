import axios from 'axios';
import { NEW_SAVED_SEARCH_SUCCESS, UPDATED_SAVED_SEARCH_SUCCESS } from '../Constants/ResponseMessages';
import { fetchUserToken } from '../utilities';
import api from '../api';

export function newSavedSearchHasErrored(bool) {
  return {
    type: 'NEW_SAVED_SEARCH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function newSavedSearchIsSaving(bool) {
  return {
    type: 'NEW_SAVED_SEARCH_IS_SAVING',
    isSaving: bool,
  };
}
export function deleteSavedSearchIsLoading(bool) {
  return {
    type: 'DELETE_SAVED_SEARCH_IS_LOADING',
    isLoading: bool,
  };
}
export function deleteSavedSearchHasErrored(bool) {
  return {
    type: 'DELETE_SAVED_SEARCH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function deleteSavedSearchSuccess(bool) {
  return {
    type: 'DELETE_SAVED_SEARCH_SUCCESS',
    hasDeleted: bool,
  };
}
export function cloneSavedSearchIsLoading(bool) {
  return {
    type: 'CLONE_SAVED_SEARCH_IS_LOADING',
    isLoading: bool,
  };
}
export function cloneSavedSearchHasErrored(bool) {
  return {
    type: 'CLONE_SAVED_SEARCH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function cloneSavedSearchSuccess(bool) {
  return {
    type: 'CLONE_SAVED_SEARCH_SUCCESS',
    hasCloned: bool,
  };
}
export function newSavedSearchSuccess(newSavedSearch) {
  return {
    type: 'NEW_SAVED_SEARCH_SUCCESS',
    newSavedSearch,
  };
}
export function currentSavedSearch(searchObject) {
  return {
    type: 'CURRENT_SAVED_SEARCH',
    searchObject,
  };
}
export function savedSearchesSuccess(savedSearches) {
  return {
    type: 'SAVED_SEARCHES_SUCCESS',
    savedSearches,
  };
}
export function savedSearchesIsLoading(bool) {
  return {
    type: 'SAVED_SEARCHES_IS_LOADING',
    isLoading: bool,
  };
}
export function savedSearchesHasErrored(bool) {
  return {
    type: 'SAVED_SEARCHES_HAS_ERRORED',
    hasErrored: bool,
  };
}

// When we want to reset alert messages after the user navigates away and comes back later,
// or when we want the user to be able to clear the current alert message.
export function routeChangeResetState() {
  return (dispatch) => {
    dispatch(deleteSavedSearchSuccess(false));
    dispatch(deleteSavedSearchHasErrored(false));
    dispatch(cloneSavedSearchSuccess(false));
    dispatch(cloneSavedSearchHasErrored(false));
    dispatch(newSavedSearchSuccess(false));
    dispatch(newSavedSearchHasErrored(false));
  };
}

export function routeChangeUnsetCurrentSearch() {
  return (dispatch) => {
    dispatch(currentSavedSearch({}));
  };
}

export function savedSearchesFetchData() {
  return (dispatch) => {
    dispatch(savedSearchesIsLoading(true));
    dispatch(savedSearchesHasErrored(false));
    axios.get(`${api}/searches/`, { headers: { Authorization: fetchUserToken() } })
            .then(response => response.data)
            .then((results) => {
              dispatch(savedSearchesIsLoading(false));
              dispatch(savedSearchesHasErrored(false));
              dispatch(savedSearchesSuccess(results));
            })
            .catch(() => {
              dispatch(savedSearchesIsLoading(false));
              dispatch(savedSearchesHasErrored(true));
            });
  };
}

export function deleteSavedSearch(id) {
  return (dispatch) => {
    dispatch(deleteSavedSearchIsLoading(true));
    dispatch(routeChangeResetState());
    axios.delete(`${api}/searches/${id}/`, { headers: { Authorization: fetchUserToken() } })
            .then(() => {
              dispatch(deleteSavedSearchIsLoading(false));
              dispatch(deleteSavedSearchHasErrored(false));
              dispatch(deleteSavedSearchSuccess('Successfully deleted the selected search.'));
              dispatch(currentSavedSearch(false));
              dispatch(savedSearchesFetchData());
            })
            .catch((err) => {
              dispatch(deleteSavedSearchHasErrored(JSON.stringify(err.response.data) || 'An error occurred trying to delete this search.'));
              dispatch(deleteSavedSearchIsLoading(false));
              dispatch(deleteSavedSearchSuccess(false));
            });
  };
}

// clone a saved search
export function cloneSavedSearch(id) {
  return (dispatch) => {
    dispatch(cloneSavedSearchIsLoading(true));
    dispatch(routeChangeResetState());
    const onCatch = (err) => {
      dispatch(cloneSavedSearchHasErrored(JSON.stringify(err.response.data) || 'An error occurred trying to clone this search.'));
      dispatch(cloneSavedSearchIsLoading(false));
      dispatch(cloneSavedSearchSuccess(false));
    };
    // get the original saved search
    axios.get(`${api}/searches/${id}/`, { headers: { Authorization: fetchUserToken() } })
            .then((response) => {
              const responseObject = response.data;
              // copy the object, but only with the properties we need
              const clonedResponse = Object.assign({},
                { name: responseObject.name,
                  endpoint: responseObject.endpoint,
                  filters: responseObject.filters },
              );
              // append a timestamp to the end of the name
              clonedResponse.name += ` - Copy - ${new Date()}`;
              axios.post(`${api}/searches/`, clonedResponse, { headers: { Authorization: fetchUserToken() } })
                      .then((postResponse) => {
                        dispatch(cloneSavedSearchIsLoading(false));
                        dispatch(cloneSavedSearchHasErrored(false));
                        dispatch(cloneSavedSearchSuccess(`Successfully cloned the selected search as "${postResponse.data.name}".`));
                        dispatch(currentSavedSearch(false));
                        dispatch(savedSearchesFetchData());
                      })
                      .catch((err) => {
                        onCatch(err);
                      });
            })
            .catch((err) => {
              onCatch(err);
            });
  };
}

export function setCurrentSavedSearch(searchObject) {
  return (dispatch) => {
    dispatch(currentSavedSearch(searchObject));
  };
}

// save a new search OR pass an ID to patch an existing search
export function saveSearch(data, id) {
  return (dispatch) => {
    dispatch(newSavedSearchIsSaving(true));
    dispatch(newSavedSearchSuccess(false));
    dispatch(newSavedSearchHasErrored(false));
    // here we handle based on the "id" param to decide whether
    // to post or patch to the correct endpoint
    let action = 'post';
    let endpoint = `${api}/searches/`;
    if (id) {
      action = 'patch';
      endpoint = `${api}/searches/${id}/`;
    }
    axios[action](endpoint, data, { headers: { Authorization: fetchUserToken() } })
            .then((response) => {
              dispatch(newSavedSearchIsSaving(false));
              dispatch(newSavedSearchHasErrored(false));
              dispatch(newSavedSearchSuccess(
                // if an ID was passed, we know to use the UPDATED message
                id ?
                  { type: UPDATED_SAVED_SEARCH_SUCCESS, text: response.data.name } :
                  { type: NEW_SAVED_SEARCH_SUCCESS, text: response.data.name },
              ));
              dispatch(setCurrentSavedSearch(response.data));
            })
            .catch((err) => {
              dispatch(newSavedSearchHasErrored(JSON.stringify(err.response.data) || 'An error occurred trying to save this search.'));
              dispatch(newSavedSearchIsSaving(false));
              dispatch(newSavedSearchSuccess(false));
            });
  };
}
