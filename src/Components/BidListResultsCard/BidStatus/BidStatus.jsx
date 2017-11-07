import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { APPROVED, CLOSED, DRAFT, DECLINED, HAND_SHAKE_ACCEPTED,
  HAND_SHAKE_OFFERED, IN_PANEL, SUBMITTED } from '../../../Constants/BidStatuses';

const BidStatus = ({ status }) => {
  let icon;
  let text;
  switch (status) {
    case APPROVED.property:
      icon = 'trophy';
      text = APPROVED.text;
      break;
    case CLOSED.property:
      icon = 'clock-o';
      text = CLOSED.text;
      break;
    case DRAFT.property:
      icon = 'bookmark';
      text = DRAFT.text;
      break;
    case DECLINED.property:
      icon = 'times';
      text = DECLINED.text;
      break;
    case HAND_SHAKE_ACCEPTED.property:
      icon = 'handshake-o';
      text = HAND_SHAKE_ACCEPTED.text;
      break;
    case HAND_SHAKE_OFFERED.property:
      icon = 'exclamation-circle';
      text = HAND_SHAKE_OFFERED.text;
      break;
    case IN_PANEL.property:
      icon = 'gavel';
      text = IN_PANEL.text;
      break;
    case SUBMITTED.property:
      icon = 'check';
      text = SUBMITTED.text;
      break;
    default:
      icon = 'question';
      text = 'Status unknown';
  }
  return (
    <div className="bid-list-card-title-status">
      <FontAwesome name={icon} /> {text}
    </div>
  );
};

BidStatus.propTypes = {
  status: PropTypes.string.isRequired,
};


export default BidStatus;
