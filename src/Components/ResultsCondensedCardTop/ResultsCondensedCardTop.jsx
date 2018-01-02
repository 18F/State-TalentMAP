import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import ResultsNewFlag from '../ResultsNewFlag';
import Favorite from '../Favorite/Favorite';
import { NO_LAST_UPDATED_DATE } from '../../Constants/SystemMessages';
import { POSITION_DETAILS, FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import { formatDate } from '../../utilities';

const ResultsCondensedCardTop = ({ type, position, toggleFavorite, favorites,
  userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored }) => {
  let flagText;
  if (type === 'highlighted') { flagText = 'Highlighted'; }
  if (type === 'new') { flagText = 'New'; }
  const lastUpdatedDate = formatDate(position.update_date) || NO_LAST_UPDATED_DATE;
  return (
    <div className="usa-grid-full condensed-card-top">
      <div className="usa-grid-full condensed-card-top-header-container">
        <div className="condensed-card-top-header condensed-card-top-header-left">
          <ResultsNewFlag text={flagText} />
        </div>
        <div className="condensed-card-top-header condensed-card-top-header-right">
          {
            !!favorites && <Favorite
              compareArray={favorites}
              onToggle={toggleFavorite}
              isLoading={userProfileFavoritePositionIsLoading}
              hasErrored={userProfileFavoritePositionHasErrored}
              refKey={position.id}
              hideText
            />
          }
        </div>
      </div>
      <FontAwesome className="condensed-top-background-image" name={type === 'highlighted' ? 'building' : 'flag'} size="3x" />
      <div className="usa-width-one-whole condensed-card-last-updated">
        <span className="last-updated-title">Last Updated: </span>
        <span className="last-updated-date">
          {lastUpdatedDate}
        </span>
      </div>
    </div>
  );
};

ResultsCondensedCardTop.propTypes = {
  type: PropTypes.string,
  position: POSITION_DETAILS.isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
};

ResultsCondensedCardTop.defaultProps = {
  type: 'new',
};

export default ResultsCondensedCardTop;
