import React from 'react';
import PropTypes from 'prop-types';
import { NO_BUREAU, NO_GRADE, NO_SKILL, NO_END_DATE, NO_TOUR_OF_DUTY, NO_POST_DIFFERENTIAL, NO_DANGER_PAY } from '../../Constants/SystemMessages';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import LanguageList from '../../Components/LanguageList/LanguageList';
import { formatDate, propOrDefault, getAccessiblePositionNumber, getDifferentialPercentage } from '../../utilities';
import PositionDetailsDescription from './PositionDetailsDescription';
import CondensedCardDataPoint from '../CondensedCardData/CondensedCardDataPoint';
import PositionDetailsContact from './PositionDetailsContact';
import OBCUrl from '../OBCUrl';
import HowToBid from './HowToBid';

const PositionDetailsItem = ({ details, editDescriptionContent, resetDescriptionEditMessages,
editPocContent, editWebsiteContent }) => {
  const tourEndDate = propOrDefault(details, 'current_assignment.estimated_end_date');
  const formattedTourEndDate = tourEndDate ? formatDate(tourEndDate) : NO_END_DATE;

  const formattedBureau = details.bureau || NO_BUREAU;
  const formattedTOD = propOrDefault(details, 'post.tour_of_duty') || NO_TOUR_OF_DUTY;

  const postDifferential = getDifferentialPercentage(propOrDefault(details, 'post.differential_rate'), NO_POST_DIFFERENTIAL);
  const dangerPay = getDifferentialPercentage(propOrDefault(details, 'post.danger_pay'), NO_DANGER_PAY);

  const OBCId = propOrDefault(details, 'post.obc_id');
  const getFormattedObcData = (prefix) => {
    if (OBCId) {
      return (<span> {prefix} | <OBCUrl id={OBCId} type="post-data" label="View OBC Data" /></span>);
    }
    return prefix;
  };
  return (
    <div className="usa-grid-full padded-main-content">
      <div className="usa-grid-full position-details-description-container positions-details-about-position">
        <div className="usa-width-two-thirds about-section-left">
          <h2>About the Position</h2>
          <PositionDetailsDescription
            details={details}
            editDescriptionContent={editDescriptionContent}
            resetDescriptionEditMessages={resetDescriptionEditMessages}
          />
          <div className="usa-grid-full data-point-section">
            <CondensedCardDataPoint title="Skill Code" content={details.skill || NO_SKILL} />
            <CondensedCardDataPoint ariaLabel={getAccessiblePositionNumber(details.position_number)} title="Position Number" content={details.position_number} />
            <CondensedCardDataPoint title="Language" content={<LanguageList languages={details.languages} />} />
            <CondensedCardDataPoint title="Grade" content={details.grade || NO_GRADE} />
            <CondensedCardDataPoint title="Transfer Eligibility Date" content={formattedTourEndDate} />
            <CondensedCardDataPoint title="Incumbent" content={formattedIncumbent} />
            <CondensedCardDataPoint title="Bureau" content={formattedBureau} />
            <CondensedCardDataPoint title="Tour of Duty" content={formattedTOD} />
            <CondensedCardDataPoint title="Post Differential" content={formattedOBCData} />
            <CondensedCardDataPoint title="Danger Pay" content={formattedOBCData} />
          </div>
        </div>
        <div className="usa-width-one-third position-details-contact-container">
          <PositionDetailsContact
            details={details}
            editWebsiteContent={editWebsiteContent}
            editPocContent={editPocContent}
            resetDescriptionEditMessages={resetDescriptionEditMessages}
          />
          <HowToBid />
        </div>
      </div>
    </div>
  );
};

PositionDetailsItem.propTypes = {
  details: POSITION_DETAILS,
  editDescriptionContent: PropTypes.func.isRequired,
  resetDescriptionEditMessages: PropTypes.func.isRequired,
  editWebsiteContent: PropTypes.func.isRequired,
  editPocContent: PropTypes.func.isRequired,
};

PositionDetailsItem.defaultProps = {
  details: null,
};

export default PositionDetailsItem;
