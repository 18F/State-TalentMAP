import React from 'react';
import PropTypes from 'prop-types';
import { GLOSSARY_ERROR_OBJECT } from '../../../Constants/PropTypes';
import { formatDate } from '../../../utilities';
import ArchiveIcon from '../ArchiveIcon';

const GlossaryEditorCardBottom = ({ isNewTerm, hasErrored, showEmptyWarning,
dateUpdated, updatedBy, isArchived, id, submitGlossaryTerm }) => {
  const date = dateUpdated ? formatDate(dateUpdated) : false;
  const dateString = date ? `Updated on ${date}` : 'Date updated unknown';

  const showResponseError = hasErrored.hasErrored && hasErrored.id === id;
  const showWarningOrError = showEmptyWarning || showResponseError;

  return (
    <div className="usa-grid-full glossary-card-bottom-container">
      <div className="glossary-warning-container">
        {
          showWarningOrError &&
            <span className="usa-input-error-message" role="alert">
              { showEmptyWarning && 'Title and definition cannot be blank.' }
              { showResponseError && 'Error updating term.' }
            </span>
        }
      </div>
      {
        !isNewTerm &&
          <div className="usa-grid-full glossary-editor-card-bottom">
            <div>{dateString}</div>
            <div>Editor: {updatedBy || 'None listed'}</div>
            <ArchiveIcon onSubmitOption={submitGlossaryTerm} isArchived={isArchived} id={id} />
          </div>
      }
    </div>
  );
};

GlossaryEditorCardBottom.propTypes = {
  isNewTerm: PropTypes.bool,
  hasErrored: PropTypes.oneOfType([GLOSSARY_ERROR_OBJECT, PropTypes.bool]),
  showEmptyWarning: PropTypes.bool,
  dateUpdated: PropTypes.string.isRequired,
  updatedBy: PropTypes.string,
  isArchived: PropTypes.bool,
  id: PropTypes.number.isRequired,
  submitGlossaryTerm: PropTypes.func.isRequired,
};

GlossaryEditorCardBottom.defaultProps = {
  isNewTerm: false,
  hasErrored: {},
  showEmptyWarning: false,
  isArchived: false,
  updatedBy: undefined,
};

export default GlossaryEditorCardBottom;
