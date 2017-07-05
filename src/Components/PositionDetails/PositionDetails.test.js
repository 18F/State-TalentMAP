import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import PositionDetails from './PositionDetails';

describe('PositionDetailsComponent', () => {
  let details = null;
  let wrapper = null;

  const detailsObject = { id: 6, grade: '05', skill: 'OFFICE MANAGEMENT (9017)', bureau: '150000', organization: 'YAOUNDE CAMEROON (YAOUNDE)', position_number: '00025003', is_overseas: true, create_date: '2006-09-20', update_date: '2017-06-08', languages: [{ id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' }] };

  beforeEach(() => {
    details = TestUtils.renderIntoDocument(
      <MemoryRouter>
        <PositionDetails details={detailsObject} />
      </MemoryRouter>);
  });

  it('is defined', () => {
    expect(details).toBeDefined();
  });

  it('is can receive props', () => {
    wrapper = shallow(<PositionDetails details={detailsObject} />);
    expect(wrapper.instance().props.details.id).toBe(6);
  });

  it('handles different props', () => {
    Object.assign(detailsObject, { languages: [], is_overseas: false });

    wrapper = shallow(<PositionDetails details={detailsObject} />);
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });
});
