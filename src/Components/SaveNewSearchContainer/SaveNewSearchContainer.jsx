import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SaveNewSearchDialogue from '../SaveNewSearchDialogue';
import SaveNewSearchPrompt from '../SaveNewSearchPrompt';

class SaveNewSearchContainer extends Component {
  constructor(props) {
    super(props);
    this.toggleInput = this.toggleInput.bind(this);
    this.changeNewSearchName = this.changeNewSearchName.bind(this);
    this.submitSavedSearch = this.submitSavedSearch.bind(this);
    this.state = {
      showInput: { value: false },
      newSearchName: { value: '' },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.showInput.value && nextProps.newSavedSearchSuccess) {
      this.toggleInput();
    }
  }

  toggleInput() {
    const { showInput, newSearchName } = this.state;
    // reset the input field, since the component will re-render and be out of sync with state
    newSearchName.value = '';
    showInput.value = !showInput.value;
    this.setState({ showInput, newSearchName });
  }

  changeNewSearchName(e) {
    const { newSearchName } = this.state;
    newSearchName.value = e;
    this.setState({ newSearchName });
  }

  submitSavedSearch(e) {
    e.preventDefault();
    this.props.saveSearch(this.state.newSearchName.value);
  }

  render() {
    const { showInput } = this.state;
    const { newSavedSearchHasErrored } = this.props;
    return (
      <div className="usa-grid-full save-new-search-container">
        {
          showInput.value ?
          (
            <SaveNewSearchDialogue
              onFormSubmit={this.submitSavedSearch}
              onTextChange={this.changeNewSearchName}
              onCancel={this.toggleInput}
              newSavedSearchHasErrored={newSavedSearchHasErrored}
            />
          ) :
          (
            <SaveNewSearchPrompt
              toggleInput={this.toggleInput}
            />
          )
        }
      </div>
    );
  }
}

SaveNewSearchContainer.propTypes = {
  saveSearch: PropTypes.func.isRequired,
  newSavedSearchHasErrored: PropTypes.string.isRequired,
  newSavedSearchSuccess: PropTypes.string.isRequired,
};

export default SaveNewSearchContainer;
