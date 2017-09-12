import React from 'react';
import ResultsCondensedCard from '../ResultsCondensedCard';
import { POSITION_DETAILS_ARRAY } from '../../Constants/PropTypes';

const shortid = require('shortid');

const PopularPositionsCardList = ({ positions }) => {
  const positionList = positions.slice().map(p => (
    <div key={shortid.generate()} className="usa-width-one-third condensed-card">
      <ResultsCondensedCard type="popular" result={p} />
    </div>
  ));
  return (
    <div className="usa-grid-full condensed-card-popular">
      {positionList}
    </div>
  );
};

PopularPositionsCardList.propTypes = {
   // TODO next round - add prop types
  positions: POSITION_DETAILS_ARRAY,
};

PopularPositionsCardList.defaultProps = {
  positions: [{}, {}, {}], // TODO remove and only use real data
};

export default PopularPositionsCardList;
