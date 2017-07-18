import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RESULTS } from '../../Constants/PropTypes';
import * as AlertMessages from '../../Constants/AlertMessages';

class CompareList extends Component {

  componentWillMount() {
  }

  onChildToggle() {
    this.forceUpdate();
    this.props.onToggle();
  }

  render() {
    const { compare } = this.props;
    // TODO - move language list to its own component, as this is used in multiple places
    const languageList = (compare.languages && compare.languages.length)
      ? compare.languages.map(choice => (
        `${choice.language} `
      )) : AlertMessages.NO_LANGUAGES;
    return (
      <div>
        { this.props.compare.map(result => (
          <div key={result.id} id={result.id} className="usa-width-one-half" style={{ backgroundColor: '#F2F2F2', marginTop: '10px', marginBottom: '10px', padding: '15px 30px' }}>
            <div className="usa-grid-full">
              <Link to={`/details/${result.position_number}`}>
                <h3> Position Number: {result.position_number} </h3>
              </Link>
              <p>
                  Grade: {result.grade}
                <br />
                  Skill: {result.skill}
                <br />
                  Bureau: {result.bureau}
                <br />
                  Organization: {result.organization}
                <br />
                  Tour of Duty: {result.post && result.post.tour_of_duty ?
                    result.post.tour_of_duty : AlertMessages.NO_TOUR_OF_DUTY}
                <br />
                  Language: <span>{languageList}</span>
                <br />
                  Post: {result.post ? <Link to={`/post/${result.post.id}`}>{result.post.description}</Link> : AlertMessages.NO_POST }
                <br />
                  Post Differential: {result.post && result.post.differential_rate
                    ? result.post.differential_rate : AlertMessages.NO_POST_DIFFERENTIAL}
                <br />
                  Danger Pay: {result.post ? result.post.danger_pay : AlertMessages.NO_DANGER_PAY}
                <br />
                  COLA: {result.post && result.post.cola ?
                    result.cost_of_living_adjustment : AlertMessages.NO_COLA}
              </p>
            </div>
          </div>
          ))}
      </div>
    );
  }
}

CompareList.propTypes = {
  compare: RESULTS,
  onToggle: PropTypes.func,
};

CompareList.defaultProps = {
  compare: [],
  onToggle: () => {},
};

export default CompareList;
