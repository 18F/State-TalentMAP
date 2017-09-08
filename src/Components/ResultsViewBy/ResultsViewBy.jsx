import React from 'react';
import FontAwesome from 'react-fontawesome';

const ResultsViewBy = () => (
  <div className="results-viewby-container">
    <div className="view-label">View:</div>
    <div className="view-icon">
      <FontAwesome name="th" />
    </div>
    <div className="view-icon view-icon-border">
      <FontAwesome name="th-list" />
    </div>
  </div>
);

export default ResultsViewBy;
