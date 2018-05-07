import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import toJSON from 'enzyme-to-json';
import { AccountDropdown } from './AccountDropdown';

describe('AccountDropdown', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  it('is defined', () => {
    const accountDropdown = shallow(<AccountDropdown />);
    expect(accountDropdown).toBeDefined();
  });

  it('can take different props', () => {
    const accountDropdown = shallow(<AccountDropdown userProfile={{ user: { display_name: 'test' } }} />);
    expect(accountDropdown).toBeDefined();
  });

  it('can click the logout link', () => {
    const accountDropdown = shallow(<AccountDropdown />);

    // define the instance
    const instance = accountDropdown.instance();
    // spy the logout function
    const handleClickSpy = sinon.spy(instance, 'logout');
    // forceUpdate required for test to pass
    instance.forceUpdate();
    // click to logout
    accountDropdown.find('[href="/logout"]').simulate('click');
    // logout function should have been called once
    sinon.assert.calledOnce(handleClickSpy);
  });

  it('can call the hideDropdown function', () => {
    const accountDropdown = shallow(<AccountDropdown />);

    // define the instance
    const instance = accountDropdown.instance();
    instance.dropdown = { hide: () => {} };
    // spy the logout function
    const spy = sinon.spy(instance, 'hideDropdown');
    // click to logout
    instance.hideDropdown();
    // logout function should have been called once
    sinon.assert.calledOnce(spy);
  });

  it('does not display the name when shouldDisplayName is false', () => {
    const accountDropdown = shallow(<AccountDropdown shouldDisplayName={false} />);
    expect(accountDropdown.find('#account-username').exists()).toBe(false);
  });

  it('matches snapshot', () => {
    const accountDropdown = shallow(<AccountDropdown />);
    expect(toJSON(accountDropdown)).toMatchSnapshot();
  });

  it('matches snapshot when shouldDisplayName is true', () => {
    const accountDropdown = shallow(<AccountDropdown shouldDisplayName />);
    expect(toJSON(accountDropdown)).toMatchSnapshot();
  });

  it("can render the logged in user's name when shouldDisplayName is true", () => {
    const displayName = 'test';
    const accountDropdown = mount(<Provider store={mockStore({})}><MemoryRouter>
      <AccountDropdown shouldDisplayName userProfile={{ display_name: displayName }} />
    </MemoryRouter></Provider>);
    expect(accountDropdown.find('#account-username').text()).toBe(displayName);
  });
});
