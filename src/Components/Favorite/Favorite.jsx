import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { localStorageFetchValue, localStorageToggleValue } from '../../utilities';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      localStorageKey: null,
    };
  }

  componentWillMount() {
    const localStorageKey = this.props.type;
    this.setState({ localStorageKey });
  }

  componentDidMount() {
    this.getSaved();
  }

  onToggle() {
    this.props.onToggle();
  }

  getSaved() {
    const saved = localStorageFetchValue(this.state.localStorageKey, this.props.refKey);
    this.setState({ saved: saved.exists });
  }

  getSavedState() {
    return this.state.saved;
  }

  toggleSaved() {
    localStorageToggleValue(this.state.localStorageKey, this.props.refKey);
    this.setState({ saved: !this.state.saved });
    this.onToggle();
  }

  render() {
    const text = this.getSavedState() ? 'Remove' : 'Favorite';
    const iconClass = this.getSavedState() ? 'heart' : 'heart-o';
    return (
      // At the time of writing, CodeClimate's version of eslint-a11y-plugin
      // did not take role="button" into account with the following error:
      // eslint-disable-next-line no-static-element-interactions
      <div tabIndex="0" role="button" style={{ cursor: 'pointer' }} onClick={() => this.toggleSaved()}>
        <FontAwesome name={iconClass} /> {text}
      </div>
    );
  }
}

Favorite.propTypes = {
  refKey: PropTypes.string.isRequired,
  type: PropTypes.string,
  onToggle: PropTypes.func,
};

Favorite.defaultProps = {
  type: 'fav',
  onToggle: EMPTY_FUNCTION,
};

export default Favorite;
