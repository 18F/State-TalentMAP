import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ITEMS } from '../../Constants/PropTypes';
import FieldSet from '../../Components/FieldSet/FieldSet';
import SelectForm from '../../Components/SelectForm/SelectForm';
import { formExploreRegionDropdown } from '../../utilities';

class ExploreRegionDropdown extends Component {
  constructor(props) {
    super(props);
    this.selectRegion = this.selectRegion.bind(this);
    this.searchRegion = this.searchRegion.bind(this);
    this.state = {
      selection: { value: '' },
    };
  }

  selectRegion(e) {
    const { selection } = this.state;
    selection.value = e.target.value;
    this.setState({ selection });
  }

  searchRegion(e) {
    e.preventDefault();
    this.props.onRegionSubmit(this.state.selection.value);
  }

  render() {
    const { filters } = this.props;
    // function to find the Region filters
    const regions = formExploreRegionDropdown(filters);

    const { selection } = this.state;
    return (
      <div className="usa-form">
        <form onSubmit={this.searchRegion}>
          <div className="usa-width-one-half explore-region-fieldset">
            <FieldSet legend="region" legendSrOnly>
              <SelectForm
                id="explore-region-dropdown"
                label="Explore by Region"
                onSelectOption={this.selectRegion}
                options={regions}
              />
            </FieldSet>
          </div>
          <div className="usa-width-one-half view-results-button">
            <button
              disabled={!selection.value.length}
              className="usa-button"
              type="submit"
            >
              {selection.value.length ? 'View results' : 'Select region'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ExploreRegionDropdown.propTypes = {
  filters: ITEMS.isRequired,
  onRegionSubmit: PropTypes.func.isRequired,
};

ExploreRegionDropdown.defaultProps = {
};

export default ExploreRegionDropdown;
