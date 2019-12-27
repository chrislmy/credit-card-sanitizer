import React from 'react';
import PropTypes from 'prop-types';

const BADGE_TYPE = {
  travis: 'travis',
  license: 'license'
}; 

const typeMapping = {
  [BADGE_TYPE.travis]: {
    href: 'https://travis-ci.com/chrislmy/credit-card-sanitzer',
    imgSrc: 'https://travis-ci.com/chrislmy/credit-card-sanitizer.svg?branch=master'
  },
  [BADGE_TYPE.license]: {
    href: 'https://opensource.org/licenses/MIT',
    imgSrc: 'https://img.shields.io/badge/license-MIT-green'
  }
};

const Badge = ({ badgeType }) => {
  return (
    <a
      href={typeMapping[badgeType].href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <img alt="badge" src={typeMapping[badgeType].imgSrc}></img>
    </a>
  );
};

Badge.propTypes = {
  badgeType: PropTypes.string
};

export { BADGE_TYPE }; 
export default Badge;
