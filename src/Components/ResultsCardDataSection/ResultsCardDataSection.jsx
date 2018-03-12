import React from 'react';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import { NO_POST, NO_POST_DIFFERENTIAL, NO_POSITION_DESCRIPTION } from '../../Constants/SystemMessages';
import OBCUrl from '../../Components/OBCUrl/OBCUrl';
import ResultsCardDataItem from '../ResultsCardDataItem/ResultsCardDataItem';
import { shortenString } from '../../utilities';

const ResultsCardDataSection = ({ result }) => (
  <div>
    <div className="usa-width-five-twelfths data-section-left-container">
      <div className="data-section-left">
        <ResultsCardDataItem
          title="Post Information"
          items={
          [
            { description: 'Post', text: result.post ? <OBCUrl id={result.post.obc_id} /> : NO_POST },
            { description: 'Bureau', text: result.bureau },
            { description: 'Post Differential',
              text: result.post
                ? result.post.differential_rate : NO_POST_DIFFERENTIAL },
          ]
          }
        />
      </div>
    </div>
    <div className="usa-width-five-twelfths data-section-right-container">
      <div className="data-section-right">
        <ResultsCardDataItem
          title="Position Information"
          items={
          [
            { description: 'Skill Code', text: result.skill },
            { description: 'Grade', text: result.grade },
            { description: 'Description',
              text: result.description && result.description.content ?
                shortenString(result.description.content, 35) :
                NO_POSITION_DESCRIPTION },
          ]
          }
        />
      </div>
    </div>
  </div>
);

ResultsCardDataSection.propTypes = {
  result: POSITION_DETAILS.isRequired,
};

export default ResultsCardDataSection;
