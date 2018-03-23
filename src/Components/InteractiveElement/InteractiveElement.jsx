import React from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { ifEnter } from '../../utilities';

// TODO - apply this component to other elements that rely on "eslint-disable" to avoid
// CodeClimate errors.
const InteractiveElement = ({ children, type, ...rest }) => {
  const onClick = rest.onClick;
  // default props that we pass to div or span
  const defaultProps = {
    role: 'button',
    tabIndex: '0',
  };
  // Props passed down. If onClick exists, we allow it to be called via "enter" keydown as well.
  // Anything here can override defaultProps.
  const props = {
    children,
    type,
    onKeyDown: onClick ? (e) => { if (ifEnter(e)) { onClick(); } } : EMPTY_FUNCTION,
    ...rest,
  };

  const CLASS_NAME = `interactive-element ${props.className}`;

  // At the time of writing, CodeClimate's version of eslint-a11y-plugin
  // did not take role="button" into account with the following error:
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  let elementToReturn = (<div
    {...defaultProps}
    {...props}
    className={CLASS_NAME}
  >
    {children}
  </div>);

  switch (type) {
    case 'span':
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      elementToReturn = (<span
        {...defaultProps}
        {...props}
        className={CLASS_NAME}
      >
        {children}
      </span>);
      break;
    case 'a':
      elementToReturn = (<a
        role="link"
        {...defaultProps}
        {...props}
        className={CLASS_NAME}
      >
        {children}
      </a>);
      break;
    default:
      break;
  }
  return (
    elementToReturn
  );
};

InteractiveElement.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['div', 'span', 'a']),
};

InteractiveElement.defaultProps = {
  className: '',
  type: 'div',
};

export default InteractiveElement;
