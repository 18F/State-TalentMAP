import React from 'react';
import { USER_PROFILE } from '../../../Constants/PropTypes';
import { NO_EMAIL, NO_USER_SKILL_CODE } from '../../../Constants/SystemMessages';
import SectionTitle from '../SectionTitle';
import InformationDataPoint from '../InformationDataPoint';
import Status from './Status';
import EditProfile from './EditProfile';
import ProfilePicture from '../../ProfilePicture';

const CurrentUser = ({ userProfile }) => (
  <div className="usa-grid-full current-user">
    <div className="current-user-top">
      <div className="section-padded-inner-container">
        <Status />
        <ProfilePicture />
        <EditProfile />
        <SectionTitle small title={`${userProfile.user.first_name} ${userProfile.user.last_name}`} className="current-user-name" />
        <InformationDataPoint
          content={userProfile.skill_code || NO_USER_SKILL_CODE}
          className="current-user-position"
        />
      </div>
    </div>
    <div className="current-user-bottom">
      <div className="section-padded-inner-container">
        <SectionTitle small title="Contact Information" />
        <InformationDataPoint title="Email Address" content={userProfile.user.email || NO_EMAIL} />
        <InformationDataPoint title="Office Number" content="+301-779-0379 ext. 3" />
        <InformationDataPoint title="Personal Contact Number" content="+240-331-7189" />
        <InformationDataPoint
          title="Post/Office Address"
          content="1234 Washington St. NW, Washington, DC 20009"
        />
      </div>
    </div>
  </div>
);

CurrentUser.propTypes = {
  userProfile: USER_PROFILE.isRequired,
};

export default CurrentUser;
