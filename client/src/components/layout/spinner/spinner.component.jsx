import React, { Fragment } from 'react';
import spinner from './spinner.svg';
import PropTypes from 'prop-types';

import './spinner.style.scss';

const Spinner = ({ style, className }) => {
  return (
    <Fragment>
      <img src={spinner} alt="Loading..." style={style} className={className} />
    </Fragment>
  );
};

Spinner.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Spinner;
