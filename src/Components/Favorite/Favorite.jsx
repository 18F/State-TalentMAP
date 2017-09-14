import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

class Favorite extends Component {

  constructor(props) {
    super(props);
    this.toggleSaved = this.toggleSaved.bind(this);
  }

  getSavedState() {
    // Is the refKey in the array? If so, return true
    const { compareArray, refKey } = this.props;
    let found = false;
    compareArray.forEach((item) => {
      if (item.id === refKey) {
        found = true;
      }
    });
    return found;
  }

  toggleSaved() {
    const { onToggle, refKey } = this.props;
    // pass the key and the "remove" param
    onToggle(refKey, this.getSavedState());
  }

  render() {
    const text = this.getSavedState() ? 'Remove' : 'Favorite';
    const iconClass = this.getSavedState() ? 'heart' : 'heart-o';
    const style = {
      pointerEvents: this.props.isLoading ? 'none' : 'inherit',
      cursor: 'pointer',
    };
    return (
      // At the time of writing, CodeClimate's version of eslint-a11y-plugin
      // did not take role="button" into account with the following error:
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        tabIndex="0"
        title="Add to favorites"
        role="button"
        style={style}
        onClick={this.toggleSaved}
      >
        <FontAwesome name={iconClass} /> {this.props.hideText ? null : text}
      </div>
    );
  }
}

Favorite.propTypes = {
  onToggle: PropTypes.func.isRequired,
  refKey: PropTypes.string.isRequired,
  hideText: PropTypes.bool,
  compareArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool,
};

Favorite.defaultProps = {
  hideText: false,
  isLoading: false,
};

export default Favorite;
