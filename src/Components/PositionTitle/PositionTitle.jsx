import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import { POSITION_DETAILS } from '../../Constants/PropTypes';

class PositionTitle extends Component { // eslint-disable-line
  render() {
    const { details, goBackLink } = this.props;
    return (
      <div className="position-details-header" style={{ overflow: 'hidden', backgroundColor: '#F2F2F2' }}>
        <div className="usa-grid" style={{ overflow: 'hidden' }}>
          <div className="usa-width-one-half">
            <div className="position-details-header-back">
              { goBackLink && // if goBackLink is defined, render...
              <div>
                <FontAwesome name="arrow-left" />
                &nbsp;
                {goBackLink}
              </div>
              }
            </div>
            <div className="position-details-header-title">
              <strong>Position Number: {details.position_number}</strong>
            </div>
            <p className="position-details-header-body">
              <strong>Description: </strong>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer
              took a galley of type and scrambled it to make...
          </p>
            <div className="usa-width-one-half position-details-header-body">
              <strong>Post website:</strong> <a href="https://www.state.gov">www.state.gov</a>
            </div>
            <div className="usa-width-one-half position-details-header-body">
              <strong>Point of Contact:</strong> <a href="tel:222-222-2222">222-222-2222</a>
            </div>
          </div>
        </div>
        <img
          className="position-details-header-image"
          alt="department of state seal"
          src="/assets/img/dos-seal-bw.png"
        />
      </div>
    );
  }
}

PositionTitle.propTypes = {
  details: POSITION_DETAILS,
  goBackLink: PropTypes.node.isRequired,
};

PositionTitle.defaultProps = {
  details: null,
};

export default PositionTitle;
