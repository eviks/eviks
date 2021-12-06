import React, { Fragment } from 'react';
import MinMaxFilter from '../minMaxFilter.component';
import Checkbox from '../../../../layout/form/checkbox/checkbox.component';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const Square = ({
  filters,
  filtersOnChange,
  filtersOnBlur,
  checkboxOnChange,
}) => {
  const { estateType, notFirstFloor, notLastFloor } = filters;

  const [t] = useTranslation();

  return (
    <div className="filter-group">
      {estateType !== 'house' && (
        <Fragment>
          {/* Floor */}
          <MinMaxFilter
            title={t('postList.filters.floor')}
            onChange={filtersOnChange}
            onBlur={filtersOnBlur}
            minInput={{
              name: 'floorMin',
              placeholder: t('postList.filters.min'),
            }}
            maxInput={{
              name: 'floorMax',
              placeholder: t('postList.filters.max'),
            }}
          />
        </Fragment>
      )}
      {/* Total floor */}
      <MinMaxFilter
        title={t('postList.filters.totalFloor')}
        onChange={filtersOnChange}
        onBlur={filtersOnBlur}
        minInput={{
          name: 'totalFloorMin',
          placeholder: t('postList.filters.min'),
        }}
        maxInput={{
          name: 'totalFloorMax',
          placeholder: t('postList.filters.max'),
        }}
      />
      {/* Checkboxes */}
      {estateType === 'apartment' && (
        <div className="filter-block">
          <Checkbox
            label={t('postList.filters.notFirstFloor')}
            options={{
              name: 'notFirstFloor',
              id: 'notFirstFloor',
              checked: notFirstFloor,
            }}
            onChange={checkboxOnChange}
          />
          <Checkbox
            label={t('postList.filters.notLastFloor')}
            options={{
              name: 'notLastFloor',
              id: 'notLastFloor',
              checked: notLastFloor,
            }}
            onChange={checkboxOnChange}
          />
        </div>
      )}
    </div>
  );
};

Square.propTypes = {
  filters: PropTypes.object.isRequired,
  filtersOnChange: PropTypes.func.isRequired,
  filtersOnBlur: PropTypes.func.isRequired,
  checkboxOnChange: PropTypes.func.isRequired,
};

export default Square;
