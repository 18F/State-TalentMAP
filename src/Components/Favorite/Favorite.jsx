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
      count: 0,
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
    this.setState({ saved: saved.exists, count: saved.count });
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
      <div>
        {text} <FontAwesome name={iconClass} onClick={() => this.toggleSaved()} />
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
