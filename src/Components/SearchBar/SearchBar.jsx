import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: { value: this.props.defaultValue || '' },
    };
  }
  changeText(e) {
    const { searchText } = this.state;
    searchText.value = e.target.value;
    this.setState({ searchText }, this.props.onChangeText(e));
  }
  render() {
    const hidden = {
      display: 'none',
    };
    const { id, type, submitDisabled, submitText, placeholder,
      alertText, onSubmitSearch, label, labelSrOnly, noForm, noButton }
      = this.props;
    const { searchText } = this.state;
    let showSubmitText = true; // do not hide submit text initially
    if (type === 'small') { showSubmitText = false; } // small search class should not have text
    const child = (
      <div className="label-input-wrapper">
        <label className={labelSrOnly ? 'usa-sr-only' : null} htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          value={searchText.value}
          onChange={e => this.changeText(e)}
          type="search"
          name="search"
          placeholder={placeholder}
        />
        <div id="enabled-search">
          { !noButton &&
          <button
            id="enabled-search-button"
            className={submitDisabled ? 'usa-button-disabled' : null}
            disabled={submitDisabled}
            type="submit"
          >
            <span className="usa-search-submit-text">{showSubmitText ? submitText : null}</span>
            <span className="usa-sr-only">{showSubmitText ? submitText : 'Search'}</span>
          </button>
          }
        </div>
        <div id="disabled-search" style={hidden}>
          {
            !noButton &&
            <button
              className="usa-button-disabled"
              disabled="true"
              type="submit"
              id="disabled-search-button"
            >
              <span className="usa-search-submit-text usa-button-disabled">
                {showSubmitText ? submitText : null}
              </span>
            </button>
          }
          <span className="alert-text">{alertText}</span>
        </div>
      </div>
    );
    return (
      <div className={`usa-search usa-search-${type}`}>
        <div role="search">
          { !noForm &&
            <form onSubmit={e => onSubmitSearch(e)}>
              {child}
            </form>
          }
          {
            noForm &&
            child
          }
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node,
  type: PropTypes.oneOf(['small', 'medium', 'big']),
  submitDisabled: PropTypes.bool,
  submitText: PropTypes.string.isRequired,
  alertText: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  onSubmitSearch: PropTypes.func,
  labelSrOnly: PropTypes.bool,
  noForm: PropTypes.bool,
  noButton: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
};

SearchBar.defaultProps = {
  type: 'big', // should be one of the USWDS search types - https://standards.usa.gov/components/search-bar/
  submitDisabled: false,
  alertText: 'Disabled',
  label: 'Search', // sr only if flagged
  labelSrOnly: true,
  noForm: false,
  noButton: false,
  placeholder: null,
  defaultValue: null,
  onSubmitSearch: EMPTY_FUNCTION,
};

export default SearchBar;
