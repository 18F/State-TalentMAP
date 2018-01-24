import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import NavLinksContainer from '../NavLinksContainer';
import NavLink from '../NavLink';

const ProfileMenuCollapsed = ({ expand }) => (
  <div className="usa-grid-full profile-menu profile-menu-collapsed">
    <div className="menu-title">
      <button className="unstyled-button" title="Expand menu" onClick={expand}>
        <FontAwesome name="exchange" />
      </button>
    </div>
    <NavLinksContainer>
      <NavLink iconName="user" link="/profile/dashboard/" />
      <NavLink iconName="comments-o" link="/profile/inbox/" />
      <NavLink iconName="globe" link="/profile/notifications/" />
      <NavLink iconName="users" link="/profile/contacts/" />
      <NavLink iconName="file-text" link="/profile/documents/" />
    </NavLinksContainer>
  </div>
);

ProfileMenuCollapsed.propTypes = {
  expand: PropTypes.func.isRequired,
};

export default ProfileMenuCollapsed;
