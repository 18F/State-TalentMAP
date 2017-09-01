import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Accordion from '../../Accordion/Accordion';
import AccordionItem from '../../Accordion/AccordionItem/AccordionItem';
import { FILTER_ITEMS_ARRAY, EMPTY_FUNCTION } from '../../../Constants/PropTypes';

const shortid = require('shortid'); // only use shortid if we don't have a key to use

class MultiSelectFilterContainer extends Component { // eslint-disable-line
  render() {
    return (
      <Accordion>
        {
          this.props.multiSelectFilterList.map(item => (
            <AccordionItem
              key={item.title || shortid.generate()}
              id={`checkbox-${item.title}`}
              title={item.title}
              expanded={item.expanded}
              setAccordion={this.props.setAccordion}
            >
              {item.content}
            </AccordionItem>))
        }
      </Accordion>
    );
  }
}

MultiSelectFilterContainer.propTypes = {
  multiSelectFilterList: FILTER_ITEMS_ARRAY.isRequired,
  setAccordion: PropTypes.func,
};

MultiSelectFilterContainer.defaultProps = {
  setAccordion: EMPTY_FUNCTION,
};

export default MultiSelectFilterContainer;
