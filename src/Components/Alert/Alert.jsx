import React from 'react';
import PropTypes from 'prop-types';

const shortid = require('shortid');

const Alert = ({ type, title, messages, isAriaLive }) => {
  // 'type' is injected into the class name
  // type 'error' requires an ARIA role
  let ariaLiveProps = {};
  if (isAriaLive) {
    ariaLiveProps = {
      'aria-live': 'polite',
      'aria-atomic': 'true',
    };
  }
  return (
    <div className={`usa-alert usa-alert-${type}`} role={(type === 'error') ? 'alert' : null} {...ariaLiveProps}>
      <div className="usa-alert-body">
        <h3 className="usa-alert-heading">{title}</h3>
        {messages.map(message =>
          (<p className="usa-alert-text" key={shortid.generate()}>
            {message.body}
          </p>),
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'warning', 'error', 'success']),
  title: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string,
    })),
  isAriaLive: PropTypes.bool,
};

Alert.defaultProps = {
  type: 'info', // should be one of the USWDS alert types - https://standards.usa.gov/components/alerts/
  messages: [{ body: '' }],
  isAriaLive: false,
};

export default Alert;
