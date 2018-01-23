import React, { Component } from 'react';
import { BIDDER_OBJECT } from '../../../Constants/PropTypes';
import UserProfileGeneralInformation from '../../ProfileDashboard/UserProfile/UserProfileGeneralInformation';
import UserProfilePersonalInformation from '../../ProfileDashboard/UserProfile/UserProfilePersonalInformation';
import UserProfileBidInformation from '../../ProfileDashboard/UserProfile/UserProfileBidInformation';
import BidderPortfolioViewMore from '../BidderPortfolioViewMore';
import BidderPortfolioGridItemAdditional from '../BidderPortfolioGridItemAdditional';
import CheckBox from '../../CheckBox';

class BidderPortfolioGridItem extends Component {
  constructor(props) {
    super(props);
    this.expandSection = this.expandSection.bind(this);
    this.state = {
      expanded: { value: false },
    };
  }
  expandSection() {
    this.setState({
      expanded: { value: !this.state.expanded.value },
    });
  }
  render() {
    const { userProfile } = this.props;
    const { expanded } = this.state;
    return (
      <div className="bidder-portfolio-grid-item-container">
        <div className="usa-grid-full current-user bidder-portfolio-grid-item">
          <div className="usa-width-one-fourth grid-item-section">
            <div className="checkbox-container">
              <CheckBox id={`checkbox-${userProfile.id}`} label="Select this user" value={false} labelSrOnly small />
            </div>
            <div className="general-information-container" >
              <UserProfileGeneralInformation
                userProfile={userProfile}
                showEditLink={false}
                useGroup
              />
            </div>
          </div>
          <div
            className={`usa-width-one-fourth grid-item-section
              current-user-personal-information-grid-container`}
          >
            <UserProfilePersonalInformation userProfile={userProfile} />
          </div>
          <div className="usa-width-one-fourth grid-item-section">
            <UserProfileBidInformation
              /* Object [0] should be the most recent. If undefined, use 0. */
              draft={userProfile.bid_statistics[0] ? userProfile.bid_statistics[0].draft : 0}
              submitted={userProfile.bid_statistics[0]
                ? userProfile.bid_statistics[0].submitted : 0}
            />
          </div>
          <div className="usa-width-one-fourth grid-item-section">
            <BidderPortfolioViewMore
              className="tm-button-alt"
              onClick={this.expandSection}
              isExpanded={expanded.value}
            />
          </div>
        </div>
        {
          expanded.value &&
            <BidderPortfolioGridItemAdditional clientId={userProfile.id} />
        }
      </div>
    );
  }
}

BidderPortfolioGridItem.propTypes = {
  userProfile: BIDDER_OBJECT.isRequired,
};

export default BidderPortfolioGridItem;
