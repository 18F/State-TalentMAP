import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ProfileMenu from './ProfileMenu';

describe('ProfileMenuComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ProfileMenu
        currentPath="/profile/favorites/"
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('it sets isHighlighted to correct values', () => {
    const wrapper = shallow(
      <ProfileMenu
        currentPath="/profile/favorites/"
      />,
    );
    expect(wrapper.find('[title="Bid List"]').prop('isHighlighted')).toBe(false);
    // Favorites should be the only highlighted link
    expect(wrapper.find('[title="Favorites"]').prop('isHighlighted')).toBe(true);
    expect(wrapper.find('[title="Inbox"]').prop('isHighlighted')).toBe(false);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ProfileMenu
        currentPath="/profile/favorites/"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
