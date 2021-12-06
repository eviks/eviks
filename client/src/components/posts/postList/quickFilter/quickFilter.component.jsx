import React, { useRef } from 'react';
import useOutsideClick from '../../../../services/hooks/useOutsideClick';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const QuickFilter = ({
  component: Component,
  filterButtonRef,
  filterOnClick,
}) => {
  const wrapperRef = useRef(null);
  useOutsideClick([wrapperRef, filterButtonRef], filterOnClick);

  const [t] = useTranslation();

  return (
    <div ref={wrapperRef} className="quick-filter-wrapper shadow-border">
      <Component />
      <div>
        <button
          className="btn btn-primary btn-md"
          onClick={() => filterOnClick()}
        >
          {t('postList.filters.doneButton')}
        </button>
      </div>
    </div>
  );
};

QuickFilter.propTypes = {
  filterButtonRef: PropTypes.object.isRequired,
  filterOnClick: PropTypes.func.isRequired,
};

export default QuickFilter;
