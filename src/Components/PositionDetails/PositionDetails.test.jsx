import { shallow } from 'enzyme';
import React from 'react';
import PositionDetails from './PositionDetails';
import detailsObject from '../../Constants/TestObjects';

describe('PositionDetailsComponent', () => {
  let wrapper = null;

  const api = 'localhost:8000/api/v1/';

  beforeEach(() => {
  });

  it('can receive props', () => {
    wrapper = shallow(
      <PositionDetails api={api} details={detailsObject} isLoading={false} hasErrored={false} />,
    );
    expect(wrapper.instance().props.details.id).toBe(6);
  });

  it('handles different props and different position objects', () => {
    Object.assign(detailsObject, { languages: [], post: null, is_overseas: false });

    wrapper = shallow(
      <PositionDetails api={api} details={detailsObject} isLoading={false} hasErrored={false} />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });

  it('handles different types of position objects', () => {
    Object.assign(detailsObject, { languages: [], is_overseas: true });

    wrapper = shallow(
      <PositionDetails api={api} details={detailsObject} isLoading hasErrored={false} />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });
});
