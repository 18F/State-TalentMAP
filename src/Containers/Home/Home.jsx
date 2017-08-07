import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { filtersFetchData } from '../../actions/filters';
import Filters from '../../Components/Filters/Filters';
import { ITEMS, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { PUBLIC_ROOT } from '../../login/DefaultRoutes';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proficiency: {},
      qString: null,
      searchText: { value: '' },
    };
  }

  componentWillMount() {
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(PUBLIC_ROOT);
    } else {
      this.getFilters();
    }
  }

  onChildSubmit(e) {
    this.props.onNavigateTo(e);
  }

  getFilters() {
    const { api, items } = this.props;
    this.props.fetchData(api, items);
  }

  render() {
    return (
      <div>
        <Filters
          isLoading={this.props.isLoading}
          onSubmit={e => this.onChildSubmit(e)}
          items={this.props.items}
        />
      </div>
    );
  }
}

Home.propTypes = {
  api: PropTypes.string.isRequired,
  onNavigateTo: PropTypes.func,
  fetchData: PropTypes.func,
  isLoading: PropTypes.bool,
  items: ITEMS,
  isAuthorized: PropTypes.func.isRequired,
};

Home.defaultProps = {
  items: [],
  onNavigateTo: EMPTY_FUNCTION,
  fetchData: EMPTY_FUNCTION,
  hasErrored: false,
  isLoading: true,
};

const mapStateToProps = state => ({
  items: state.filters,
  hasErrored: state.filtersHasErrored,
  isLoading: state.filtersIsLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchData: (api, items) => dispatch(filtersFetchData(api, items)),
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
