import React from 'react';
import PropTypes from 'prop-types';
import { SAVED_SEARCH_OBJECT, NEW_SAVED_SEARCH_SUCCESS_MESSAGE } from '../../Constants/PropTypes';
import { ifEnter } from '../../utilities';

const SaveNewSearchPrompt = ({ toggleInput, newSavedSearchSuccess,
  currentSavedSearch }) => {
  const currentSearchExists = currentSavedSearch.id;
  return (
    <div className="usa-grid-full">
      <div className="usa-grid-full">
        {
          currentSearchExists ? `Saved search: ${currentSavedSearch.name}. ` : null
        }
        <a
          className="save-search-link"
          tabIndex="0"
          role="link"
          onClick={toggleInput}
          onKeyUp={(e) => { if (ifEnter(e)) { toggleInput(); } }}
        >
          {currentSearchExists ? 'Edit this search.' : 'Save this search.'}
        </a>
        &nbsp;{currentSearchExists ? null : 'You will be able to come back to these results later.'}
      </div>
      {
        newSavedSearchSuccess &&
        <div className="usa-grid-full">
          {newSavedSearchSuccess}
        </div>
      }
    </div>
  );
};

SaveNewSearchPrompt.propTypes = {
  toggleInput: PropTypes.func.isRequired,
  newSavedSearchSuccess: NEW_SAVED_SEARCH_SUCCESS_MESSAGE,
  currentSavedSearch: SAVED_SEARCH_OBJECT,
};

SaveNewSearchPrompt.defaultProps = {
  newSavedSearchSuccess: false,
  currentSavedSearch: {},
};

export default SaveNewSearchPrompt;
