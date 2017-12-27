import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { ROUTER_LOCATION_OBJECT, EMPTY_FUNCTION, PROFILE_MENU_SECTION_EXPANDED } from '../../../Constants/PropTypes';
import { ifEnter } from '../../../utilities';
import isCurrentPath from '../navigation';

class NavLink extends Component {
  constructor(props) {
    super(props);
    this.toggleNestedLinksVisibility = this.toggleNestedLinksVisibility.bind(this);
    this.state = {
      showNestedLinks: { value: false },
    };
  }

  componentWillMount() {
    this.shouldExpandIfChildActive();
  }

  // Checks if any of the children links match the current path.
  // If so, we'll toggle the visibility to true
  shouldExpandIfChildActive() {
    const { children, expandedSection, title } = this.props;
    let found = false;
    // Iterate through the children.
    // When there's only one child, we can't use forEach...
    if (children && children.length > 1) {
      children.forEach((c) => {
        if (c && c.props && c.props.link &&
          isCurrentPath(this.props.location.pathname, c.props.link)) {
          found = true;
        }
      });
    // So we'll check here and act directly on the only child, if it exists
    } else if (children) {
      if (children.props && children.props.link && children.props.link &&
          isCurrentPath(this.props.location.pathname, children.props.link)) {
        found = true;
      }
    }
    // If the title matches the expandedSection title, check the display boolean
    // on whether or not to expand this section.
    if (expandedSection && expandedSection.title === title) { found = expandedSection.display; }
    if (found) {
      const { showNestedLinks } = this.state;
      showNestedLinks.value = true;
      this.setState({ showNestedLinks });
    }
  }

  // This function wraps an element based on whether it contains a link or has children.
  // This allows us to wrap elements with a link prop within a navigation <Link>, while
  // elements with children and no link become a clickable, epxandable list with its children.
  // If neither criteria is met, we simply return the unwrapped element.
  wrapInLink(element) {
    const { link, search, children, iconName } = this.props;
    // If there's no link prop, then we don't want to wrap the element in a <Link>
    if (link.length) {
      return (
        <Link to={{ pathname: link, search }} className={iconName ? 'icon-padding' : ''}>{element}</Link>
      );
    } else if (children) {
      // Else, this must be a grouping of children, so we'll wrap it accordingly.
      return (
        <div // eslint-disable-line jsx-a11y/no-static-element-interactions
          className={`usa-grid-full ${iconName ? 'icon-padding' : ''}`}
          onClick={this.toggleNestedLinksVisibility}
          onKeyUp={(e) => { if (ifEnter(e)) { this.toggleNestedLinksVisibility(); } }}
          role="link"
          tabIndex="0"
        >
          {element}
        </div>
      );
    }
    // but if neither criteria is met, we'll simply return the element
    return element;
  }

  // toggles visibility of grouped children links
  toggleNestedLinksVisibility() {
    const { children, toggleMenuSection, title } = this.props;
    if (children) {
      const { showNestedLinks } = this.state;
      showNestedLinks.value = !showNestedLinks.value;
      this.setState({ showNestedLinks });
      toggleMenuSection({ title, display: showNestedLinks.value });
    }
  }

  render() {
    const { title, iconName, children, link, hidden } = this.props;
    const isHighlighted = isCurrentPath(this.props.location.pathname, link);
    const { showNestedLinks } = this.state;
    return (
      <div>
        {
          !hidden &&
          <li className={`usa-grid-full ${children ? 'expandable-link' : ''} ${isHighlighted ? 'link-highlighted' : 'link-unhighlighted'}`}>
            <div className="list-item-wrapper">
              {
                this.wrapInLink( // wrap our element
                  <span>
                    {
                      <span className="fa-container">
                        {iconName ? <FontAwesome name={iconName} /> : null}
                      </span>
                    }
                    <span className="title-container">
                      {title}
                    </span>
                    {
                      !!children && // if there are children, pass an angle-down/angle-right icon
                      <span className="fa-container angle-container">
                        <FontAwesome name={showNestedLinks.value ? 'angle-down' : 'angle-right'} />
                      </span>
                    }
                  </span>,
                )
              }
            </div>
            {
              // if the group was clicked and children exist, show the children
              showNestedLinks.value &&
              <ul className="children-ul">
                {children}
              </ul>
            }
          </li>
        }
      </div>
    );
  }
}

NavLink.propTypes = {
  title: PropTypes.string,
  iconName: PropTypes.string,
  link: PropTypes.string, // ex: "/profile/", "/profile/favorites/", etc.
  children: PropTypes.node, // a group of child links. Should be rendered using this component
  location: ROUTER_LOCATION_OBJECT.isRequired,
  search: PropTypes.string, // optional search params to pass to <Link>

  // We still render hidden NavLinks so that we don't break NavLinksContainer.
  // They're simply returned as empty divs.
  hidden: PropTypes.bool,
  expandedSection: PROFILE_MENU_SECTION_EXPANDED,
  toggleMenuSection: PropTypes.func,
};

NavLink.defaultProps = {
  title: '',
  iconName: '',
  link: '',
  children: null,
  search: '',
  hidden: false,
  expandedSection: undefined,
  toggleMenuSection: EMPTY_FUNCTION,
};

export default withRouter(NavLink);

// we also need to export an unwrapped version for testing
export const NavLinkUnwrapped = NavLink;
