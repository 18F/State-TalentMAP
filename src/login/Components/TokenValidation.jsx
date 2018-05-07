import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';

import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import Alert from '../../Components/Alert/Alert';

import { tokenValidationRequest } from '../actions';

// initialize cookies
const cookies = new Cookies();

export class TokenValidation extends Component {
  // Check for token on component mount
  componentWillMount() {
    const query = window.location.search.replace('?', '') || '';
    const parsedQuery = queryString.parse(query);
    // First check to see if there's a token in the query params.
    let token = parsedQuery.tmApiToken;
    // If not, check if one exists in the cookies.
    if (!token) { token = cookies.get('tmApiToken'); }
    // If neither criteria is met, set the token to a fake token
    // which will cause a failure.
    if (!token) { token = 'No token'; }
    // Finally, pass that token to the tokenValidationRequest function
    this.props.tokenValidationRequest(token);
  }

  render() {
    const {
      login: {
        requesting,
        messages,
        errors,
      },
    } = this.props;

    return (
      <div className="usa-grid login-container content-container">
        <div className="usa-grid login">
          <div className="auth-messages">
            {
              !requesting && !!errors.length &&
              (<div className="usa-width-one-half">
                <Alert title="Failed to login due to:" messages={errors} type="error" />
              </div>)
            }
            {
              !requesting && !!messages.length &&
              (<div className="usa-width-one-half">
                <Alert title="Please see below" messages={messages} type="info" />
              </div>)
            }
            {
              requesting &&
              (<div className="usa-width-one-half">
                <Alert title="Logging in..." type="info" />
              </div>)
            }
          </div>
        </div>
      </div>
    );
  }
}

TokenValidation.propTypes = {
  login: PropTypes.shape({
    requesting: PropTypes.bool,
    successful: PropTypes.bool,
    messages: PropTypes.array,
    errors: PropTypes.array,
  }).isRequired,
  tokenValidationRequest: PropTypes.func,
};

TokenValidation.defaultProps = {
  tokenValidationRequest: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  login: state.login,
});

export const mapDispatchToProps = dispatch => ({
  tokenValidationRequest: token => dispatch(tokenValidationRequest(token)),
});

const connected = connect(mapStateToProps, mapDispatchToProps)(TokenValidation);

export default connected;
