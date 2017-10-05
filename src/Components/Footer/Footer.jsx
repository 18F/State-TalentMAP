import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="usa-footer usa-footer-medium tm-footer" role="contentinfo">
    <div className="usa-footer-primary-section tm-footer-nav">
      <div className="usa-grid-full">
        <nav className="usa-footer-nav">
          <ul className="usa-unstyled-list">
            <li className="usa-width-one-sixth usa-footer-primary-content">
              <Link className="usa-footer-primary-link" to="/">Home</Link>
            </li>
            <li className="usa-width-one-sixth usa-footer-primary-content">
              <a className="usa-footer-primary-link" href="https://github.com/18F/State-TalentMAP">About</a>
            </li>
            <li className="usa-width-one-sixth usa-footer-primary-content">
              <a className="usa-footer-primary-link" href="https://github.com/18F/State-TalentMAP/issues">Feedback</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div className="usa-footer-secondary_section tm-footer-body">
      <div className="usa-grid">
        <div className="usa-footer-logo usa-width-one-half">
          <img
            className="usa-footer-logo-img"
            src="/assets/img/rsz_dos-seal.png"
            alt="DOS Seal"
          />
        </div>
        <div className="usa-footer-contact-links usa-width-one-half tm-footer-body-contact">
          <div className="tm-footer-body-contact-item">
            <a href="mailto:TalentMAPOutreach@Dos.gov">
              TalentMAPOutreach@Dos.gov
            </a>
          </div>
          <div className="tm-footer-body-contact-item">
              Join the TalentMAP Community
            </div>
          <div className="tm-footer-body-contact-item">
              Need help? Contact TalentMAP Team
          </div>
        </div>
      </div>
    </div>
  </footer>
  );

export default Footer;
