import React from 'react';
import PropTypes from 'prop-types';

const TotalResults = ({ total, pageNumber, pageSize }) => (
  <span id="total-results">
    Viewing&nbsp;
      {(pageNumber * pageSize) + 1} - {Math.min((pageSize * (pageNumber + 1)), total)} of {total}
    &nbsp;results
  </span>
  );

TotalResults.propTypes = {
  total: PropTypes.number.isRequired, // total number of results
  pageNumber: PropTypes.number.isRequired, // current page number
  pageSize: PropTypes.number.isRequired, // paging size
};

export default TotalResults;
