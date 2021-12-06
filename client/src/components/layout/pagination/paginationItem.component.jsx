import React from 'react';
import { SvgArrowLeft, SvgArrowRight } from '../icons';
import PropTypes from 'prop-types';

const PaginationItem = ({
  page,
  next = false,
  prev = false,
  onClick,
  className,
}) => {
  const getItemText = () => {
    if (next) {
      return <SvgArrowRight />;
    }

    if (prev) {
      return <SvgArrowLeft />;
    }

    return page;
  };

  const handleOnClick = () => {
    if (!onClick) return;
    onClick(page);
  };

  return (
    <div className={className} onClick={handleOnClick}>
      {getItemText()}
    </div>
  );
};

PaginationItem.propTypes = {
  page: PropTypes.number.isRequired,
  next: PropTypes.bool,
  prev: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string.isRequired,
};

export default PaginationItem;
