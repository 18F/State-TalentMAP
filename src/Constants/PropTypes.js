import PropTypes from 'prop-types';

export const LANGUAGES = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    language: PropTypes.string,
    written_proficiency: PropTypes.string,
    spoken_proficiency: PropTypes.string,
    representation: PropTypes.string,
  }),
);

export const POST_MISSION_DATA = PropTypes.shape({
  id: PropTypes.number,
  tour_of_duty: PropTypes.string,
  code: PropTypes.string,
  description: PropTypes.string,
  cost_of_living_adjustment: PropTypes.number,
  differential_rate: PropTypes.number,
  danger_pay: PropTypes.number,
  rest_relaxation_point: PropTypes.string,
  has_consumable_allowance: PropTypes.boolean,
  has_service_needs_differential: PropTypes.boolean,
  languages: LANGUAGES,
});

export const DETAILS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  grade: PropTypes.string,
  skill: PropTypes.string,
  bureau: PropTypes.string,
  organization: PropTypes.string,
  position_number: PropTypes.string.isRequired,
  is_overseas: PropTypes.boolean,
  create_date: PropTypes.string,
  update_date: PropTypes.string,
  post: POST_MISSION_DATA,
  languages: LANGUAGES,
});

export const RESULTS = PropTypes.arrayOf(
  DETAILS,
);

export const FILTERS = PropTypes.arrayOf(
  PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      description: PropTypes.string,
      long_description: PropTypes.string,
      short_description: PropTypes.string,
      effective_date: PropTypes.string,
    }),
  ),
);

export const ITEMS = PropTypes.arrayOf(
  PropTypes.shape({
    item: PropTypes.shape({
      title: PropTypes.string,
      sort: PropTypes.number,
      description: PropTypes.string,
      endpoint: PropTypes.string,
      selectionRef: PropTypes.string,
      text: PropTypes.string,
    }),
    data: FILTERS,
  }),
);
