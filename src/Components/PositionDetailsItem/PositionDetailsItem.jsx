import React from 'react';
import { Link } from 'react-router-dom';
import { NO_ORG, NO_POST, NO_BUREAU, NO_POST_DIFFERENTIAL,
  NO_DANGER_PAY, NO_END_DATE, NO_USER_LISTED } from '../../Constants/SystemMessages';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import LanguageList from '../../Components/LanguageList/LanguageList';
import PositionDetailsDataPoint from '../../Components/PositionDetailsDataPoint/PositionDetailsDataPoint';
import StaticDevContent from '../StaticDevContent';

const PositionDetailsItem = ({ details }) => (
  <div className="usa-grid-full">
    <div className="usa-width-one-whole">
      <div className="position-details-description-container">
        <div className="usa-width-one-whole position-details-description">
          <span className="position-details-description-title">Post Description</span>
          <br />
          <div className="usa-width-one-whole">
            <PositionDetailsDataPoint
              title="Organization"
              description={details.organization || NO_ORG}
            />
            <PositionDetailsDataPoint
              title="Post"
              description={
                details.post && details.post.id ?
                  <Link to={`/post/${details.post.id}`}>{details.post.location}</Link>
                  : NO_POST
              }
            />
            <PositionDetailsDataPoint
              title="Bureau"
              description={details.bureau || NO_BUREAU}
            />
            <PositionDetailsDataPoint
              title="Post Differential"
              description={
                details.post && details.post.differential_rate ?
                  details.post.differential_rate
                  : NO_POST_DIFFERENTIAL
              }
            />
            <PositionDetailsDataPoint
              title="Overseas"
              description={details.is_overseas ? 'Yes' : 'No'}
            />
            <PositionDetailsDataPoint
              title="Region"
              description={<StaticDevContent><span>Region</span></StaticDevContent>}
            />
          </div>
        </div>
        <hr width="85%" />
        <div className="usa-width-one-whole position-details-description">
          <span className="position-details-description-title">Position Description</span>
          <br />
          <div className="usa-width-one-whole">
            <PositionDetailsDataPoint
              title="Grade"
              description={details.grade}
            />
            <PositionDetailsDataPoint
              title="Language"
              description={<LanguageList languages={details.languages} />}
            />
            <PositionDetailsDataPoint
              title="Skill Code"
              description={details.skill}
            />
            <PositionDetailsDataPoint
              title="Danger Pay"
              description={details.post ? details.post.danger_pay : NO_DANGER_PAY}
            />
            <PositionDetailsDataPoint
              title="Tour End Date"
              description={details.current_assignment &&
                details.current_assignment.estimated_end_date ?
                  details.current_assignment.estimated_end_date :
                  NO_END_DATE
              }
            />
            <PositionDetailsDataPoint
              title="Incumbent"
              description={details.current_assignment &&
                details.current_assignment.user ?
                  details.current_assignment.user :
                  NO_USER_LISTED
              }
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

PositionDetailsItem.propTypes = {
  details: POSITION_DETAILS,
};

PositionDetailsItem.defaultProps = {
  details: null,
};

export default PositionDetailsItem;
