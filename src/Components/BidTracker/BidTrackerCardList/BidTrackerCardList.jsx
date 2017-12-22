import React from 'react';
import PropTypes from 'prop-types';
import { BID_RESULTS } from '../../../Constants/PropTypes';
import BidTrackerCardContainer from '../BidTrackerCardContainer';

const BidTrackerCardList = ({ bids, acceptBid, declineBid }) => (
  <div className="usa-grid-full">
    {
      bids.map(bid => (
        <BidTrackerCardContainer
          key={bid.id}
          bid={bid}
          acceptBid={acceptBid}
          declineBid={declineBid}
        />
      ))
    }
  </div>
);

BidTrackerCardList.propTypes = {
  bids: BID_RESULTS.isRequired,
  acceptBid: PropTypes.func.isRequired,
  declineBid: PropTypes.func.isRequired,
};

export default BidTrackerCardList;