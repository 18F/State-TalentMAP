import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FavoritesButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      localStorageKey: null,
    };
  }

  componentWillMount() {
    const localStorageKey = `${this.props.refKey}_${this.props.type}`;
    this.setState({ localStorageKey });
  }

  componentDidMount() {
    const isSaved = localStorage.getItem( // eslint-disable-line no-undef
      this.state.localStorageKey);
    if (isSaved) {
      const saved = true;
      this.initSetSaved(saved);
    }
  }

  getSavedState() {
    return this.state.saved;
  }

  initSetSaved(val) {
    const saved = val;
    this.setState({ saved });
  }

  toggleSaved() {
    if (this.state.saved) {
      localStorage.removeItem(this.state.localStorageKey); // eslint-disable-line no-undef
    } else {
      localStorage.setItem(this.state.localStorageKey, true); // eslint-disable-line no-undef
    }
    this.setState({ saved: !this.state.saved });
  }

  render() {
    let fromText = null;
    fromText = this.props.type === 'fav' ? 'Favorites' : fromText;
    fromText = this.props.type === 'compare' ? 'Comparison' : fromText;
    const buttonClass = this.state.saved ? 'usa-button-secondary' : '';
    const buttonText = this.getSavedState() ? `Remove from ${fromText}` : `Add to ${fromText}`;
    return (
      <div>
        <button id="changeSaved" className={buttonClass} onClick={() => this.toggleSaved()}>
          {buttonText}
        </button>
      </div>
    );
  }
}

FavoritesButton.propTypes = {
  refKey: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default FavoritesButton;
