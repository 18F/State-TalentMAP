import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { setSelectedSearchbarFilters } from '../../../actions/selectedSearchbarFilters';
import { FILTERS_PARENT, USER_PROFILE, EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import { filtersFetchData } from '../../../actions/filters/filters';
import ResultsMultiSearchHeader from '../ResultsMultiSearchHeader';

class ResultsMultiSearchHeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.state = {
      query: {
        q: '',
      },
    };
  }

  componentWillMount() {
    const { fetchFilters, filters } = this.props;
    // Have the filters already been fetched?
    // if so, we'll pass back the saved filters
    // as a param, which tells our filters action
    // to not perform AJAX, and simply compare
    // the query params against the filters
    if (filters.hasFetched) {
      fetchFilters(filters, {}, filters);
    } else { // if not, we'll perform AJAX
      fetchFilters(filters, {});
    }
  }

  onFilterChange(q) {
    const { searchbarFilters, setSearchFilters } = this.props;
    setSearchFilters({ ...searchbarFilters, ...q });
  }

  onSubmit(q) {
    const query = q;
    const stringifiedFilterValues = {};
    // Form query object by iterating through keys.
    Object.keys(query).forEach((key) => {
      // Is there a value for the key?
      if (query[key] && query[key].length) {
        // If it's an array, split it. Else, simply return the string.
        const isArray = Array.isArray(query[key]);
        if (isArray) {
          stringifiedFilterValues[key] = query[key].join();
        } else {
          stringifiedFilterValues[key] = query[key];
        }
      }
      // If there's no value for a key, delete it from the object.
      if (!stringifiedFilterValues[key] || !stringifiedFilterValues[key].length) {
        delete stringifiedFilterValues[key];
      }
    });
    // Stringify the object
    const qString = queryString.stringify(stringifiedFilterValues);
    // Navigate to results with the formed query.
    this.props.onNavigateTo(`/results?${qString}`);
  }

  render() {
    const { filters, userProfile, userProfileIsLoading, filtersIsLoading,
      searchbarFilters } = this.props;
    return (
      <ResultsMultiSearchHeader
        filters={filters.filters}
        filtersIsLoading={filtersIsLoading}
        userProfile={userProfile}
        userProfileIsLoading={userProfileIsLoading}
        onSubmit={this.onSubmit}
        onFilterChange={this.onFilterChange}
        defaultFilters={searchbarFilters}
      />
    );
  }
}

ResultsMultiSearchHeaderContainer.propTypes = {
  filters: FILTERS_PARENT,
  filtersIsLoading: PropTypes.bool,
  fetchFilters: PropTypes.func.isRequired,
  userProfile: USER_PROFILE.isRequired,
  userProfileIsLoading: PropTypes.bool,
  onNavigateTo: PropTypes.func.isRequired,
  setSearchFilters: PropTypes.func.isRequired,
  searchbarFilters: PropTypes.shape({}),
};

ResultsMultiSearchHeaderContainer.defaultProps = {
  filters: { filters: [] },
  filtersIsLoading: false,
  userProfile: {},
  userProfileIsLoading: false,
  setSearchFilters: EMPTY_FUNCTION,
  searchbarFilters: {},
};

const mapStateToProps = state => ({
  filters: state.filters,
  filtersHasErrored: state.filtersHasErrored,
  filtersIsLoading: state.filtersIsLoading,
  selectedAccordion: state.selectedAccordion,
  userProfile: state.userProfile,
  userProfileIsLoading: state.userProfileIsLoading,
  searchbarFilters: state.selectedSearchbarFilters,
});

export const mapDispatchToProps = dispatch => ({
  fetchFilters: (items, queryParams, savedFilters) =>
    dispatch(filtersFetchData(items, queryParams, savedFilters)),
  onNavigateTo: dest => dispatch(push(dest)),
  setSearchFilters: query => dispatch(setSelectedSearchbarFilters(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsMultiSearchHeaderContainer);
