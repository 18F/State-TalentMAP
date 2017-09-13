import React from 'react';
import PropTypes from 'prop-types';
import { PILL_ITEM_ARRAY } from '../../Constants/PropTypes';
import Pill from '../Pill/Pill';
import { pillSort } from '../../utilities';

const PillList = ({ items, onPillClick }) => (
  <div>
    {
      (items.slice().sort(pillSort))
        .map(item =>
          (<Pill
            key={`${item.codeRef}-${item.description}`}
            description={item.description}
            codeRef={item.codeRef}
            selectionRef={item.selectionRef}
            onPillClick={(param, value, remove) => onPillClick(param, value, remove)}
          />),
        )
    }
  </div>
  );

PillList.propTypes = {
  items: PILL_ITEM_ARRAY,
  onPillClick: PropTypes.func.isRequired,
};

PillList.defaultProps = {
  items: [],
};

export default PillList;
