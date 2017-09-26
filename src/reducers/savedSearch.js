export function newSavedSearchHasErrored(state = false, action) {
  switch (action.type) {
    case 'NEW_SAVED_SEARCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function newSavedSearchIsSaving(state = false, action) {
  switch (action.type) {
    case 'NEW_SAVED_SEARCH_IS_SAVING':
      return action.isSaving;
    default:
      return state;
  }
}
export function newSavedSearchSuccess(state = false, action) {
  switch (action.type) {
    case 'NEW_SAVED_SEARCH_SUCCESS':
      return action.newSavedSearch;
    default:
      return state;
  }
}
export function deleteSavedSearchIsLoading(state = false, action) {
  switch (action.type) {
    case 'DELETE_SAVED_SEARCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function deleteSavedSearchHasErrored(state = false, action) {
  switch (action.type) {
    case 'DELETE_SAVED_SEARCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function deleteSavedSearchSuccess(state = false, action) {
  switch (action.type) {
    case 'DELETE_SAVED_SEARCH_SUCCESS':
      return action.hasDeleted;
    default:
      return state;
  }
}
export function currentSavedSearch(state = false, action) {
  switch (action.type) {
    case 'CURRENT_SAVED_SEARCH':
      return action.searchObject;
    default:
      return state;
  }
}
export function savedSearchesSuccess(state = { results: [] }, action) {
  switch (action.type) {
    case 'SAVED_SEARCHES_SUCCESS':
      return action.savedSearches;
    default:
      return state;
  }
}
export function savedSearchesIsLoading(state = false, action) {
  switch (action.type) {
    case 'SAVED_SEARCHES_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function savedSearchesHasErrored(state = false, action) {
  switch (action.type) {
    case 'SAVED_SEARCHES_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
