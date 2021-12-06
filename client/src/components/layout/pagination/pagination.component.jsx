import React, { useState, useEffect, Fragment } from 'react';
import PaginationItem from './paginationItem.component';
import PropTypes from 'prop-types';

import './pagination.style.scss';

const Pagination = ({ pagination: { skipped, current, total }, onClick }) => {
  const [state, setState] = useState({
    prevPages: [],
    nextPages: [],
  });
  const { prevPages, nextPages } = state;

  useEffect(() => {
    const newPrevPages = [];
    const newNextPages = [];

    for (
      let i = current;
      i > Math.min(current + 1, skipped) && current > 1;
      i--
    ) {
      newPrevPages.push(i - 1);
    }

    for (let i = current; i < Math.min(current + 1, total); i++) {
      newNextPages.push(i + 1);
    }

    setState({
      prevPages: newPrevPages,
      nextPages: newNextPages,
    });
  }, [current, skipped, total]);

  return (
    <div className="pagination">
      {/* Prev Button */}
      {skipped && (
        <PaginationItem
          className={'pagination-item pagination-item-page'}
          page={current - 1}
          prev={true}
          onClick={onClick}
        />
      )}
      {/* First Page */}
      {skipped && !prevPages.includes(1) && (
        <Fragment>
          <PaginationItem
            className={'pagination-item pagination-item-page'}
            page={1}
            onClick={onClick}
          />
        </Fragment>
      )}
      {/* Prev */}
      {prevPages.map((pageNumber) => (
        <PaginationItem
          key={pageNumber}
          className={'pagination-item pagination-item-page'}
          page={pageNumber}
          onClick={onClick}
        />
      ))}
      {/* Current */}
      <PaginationItem
        page={current}
        className={'pagination-item pagination-item-current'}
      />
      {/* Next */}
      {nextPages.map((pageNumber) => (
        <PaginationItem
          key={pageNumber}
          className={'pagination-item pagination-item-page'}
          page={pageNumber}
          onClick={onClick}
        />
      ))}
      {/* Last Page */}
      {total && !nextPages.includes(total) && (
        <Fragment>
          <PaginationItem
            className={'pagination-item pagination-item-page'}
            page={total}
            onClick={onClick}
          />
        </Fragment>
      )}
      {/* Next Button */}
      {total && (
        <PaginationItem
          className={'pagination-item pagination-item-page'}
          page={current + 1}
          next={true}
          onClick={onClick}
        />
      )}
    </div>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Pagination;
