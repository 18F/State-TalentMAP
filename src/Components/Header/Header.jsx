import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import close from 'uswds/dist/img/close.svg'; // close X icon
import ToggleContent from '../StaticDevContent/ToggleContent';
import { userProfileFetchData } from '../../actions/userProfile';
import { logoutRequest } from '../../login/actions';
import { USER_PROFILE, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import GovBanner from './GovBanner/GovBanner';
import AccountDropdown from '../AccountDropdown/AccountDropdown';
import { getAssetPath } from '../../utilities';
// import logo from '../../assets/logos/png/horizontal_color.png';
import Inbox from './Inbox';
import Notifications from './Notifications';

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loopActive: false,
      shuffleActive: false,
    };
  }

  componentWillMount() {
    if (this.props.isAuthorized()) {
      this.props.fetchData();
    }
  }

  render() {
    const {
      login: {
        requesting,
      },
    } = this.props;

    const logo = getAssetPath('/assets/logos/png/horizontal_color.png');

    let showLogin = (<Link to="login" id="login-desktop">Login</Link>);
    let signedInAs = null;
    const { logout } = this.props;
    if (this.props.client.token && !requesting) {
      const { userProfile } = this.props;
      showLogin = (
        <AccountDropdown
          userProfile={this.props.userProfile}
          logoutRequest={logout}
        />);
      if (userProfile.user && userProfile.user.username) {
        signedInAs = `Signed in as ${userProfile.user.username}`;
      }
    }

    // we should only show the Inbox and Notifications icons if the user is logged in
    const showAlerts = !!this.props.client.token;

    return (
      <header className="usa-header usa-header-extended tm-header" role="banner">
        <ToggleContent />
        <GovBanner />
        <div className="usa-navbar">
          <button className="usa-menu-btn">Menu</button>
          <div className="usa-logo" id="logo">
            <div className="usa-logo-text">
              <Link to="/">
                <img src={logo} alt="TalentMAP logo" />
              </Link>
            </div>
          </div>
        </div>
        <nav className="usa-nav">
          <div className="usa-nav-inner">
            <button className="usa-nav-close">
              <img src={close} alt="close" />
            </button>
            <div className="usa-nav-secondary">
              <ul className="usa-unstyled-list usa-nav-secondary-links mobile-nav">
                <li className="mobile-nav-only">
                  {signedInAs}
                </li>
                <hr className="mobile-nav-only" />
                <li>
                  <Link to="/results"><FontAwesome name="search" /> Search</Link>
                </li>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <a href="https://github.com/18F/State-TalentMAP">About</a>
                </li>
                <li>
                  <a href="https://github.com/18F/State-TalentMAP/issues">Feedback</a>
                </li>
                <span className="usa-unstyled-list mobile-nav-only">
                  <hr />
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="login" id="login-mobile" onClick={logout}>Logout</Link>
                  </li>
                </span>
                <span className="desktop-nav-only">
                  <li>
                    {showLogin}
                    {
                      showAlerts &&
                        <span>
                          <Inbox />
                          <Notifications />
                        </span>
                    }
                  </li>
                </span>
              </ul>
            </div>
          </div>
        </nav>
        <div className="usa-overlay" />
      </header>
    );
  }
}

Header.propTypes = {
  login: PropTypes.shape({
    requesting: PropTypes.bool,
    successful: PropTypes.bool,
  }).isRequired,
  client: PropTypes.shape({
    token: PropTypes.string,
  }),
  fetchData: PropTypes.func.isRequired,
  isAuthorized: PropTypes.func.isRequired,
  userProfile: USER_PROFILE,
  logout: PropTypes.func,
};

Header.defaultProps = {
  client: null,
  userProfile: {},
  logout: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  login: state.login,
  client: state.client,
  userProfile: state.userProfile,
});

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(userProfileFetchData(url)),
  logout: () => dispatch(logoutRequest()),
});

const connected = connect(mapStateToProps, mapDispatchToProps)(Header);

export default connected;
