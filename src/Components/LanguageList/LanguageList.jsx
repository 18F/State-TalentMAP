import React from 'react';
import * as AlertMessages from '../../Constants/AlertMessages';
import { LANGUAGES } from '../../Constants/PropTypes';

const LanguageList = ({ languages }) => {
  const languageList = (languages && languages.length)
    ? languages.map(choice => (
      `${choice.language} `
    )) : AlertMessages.NO_LANGUAGES;
  return (
    <span>
      {languageList}
    </span>
  );
};

LanguageList.propTypes = {
  languages: LANGUAGES,
};

LanguageList.defaultProps = {
  languages: [],
};

export default LanguageList;
