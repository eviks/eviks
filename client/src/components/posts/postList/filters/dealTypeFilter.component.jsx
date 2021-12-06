import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Radio from '../../../layout/form/radio/radio.component';
import { SvgSale, SvgRent, SvgRentPerDay } from '../../../layout/icons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import './filters.style.scss';

const DealTypeFilter = ({ dealType, locale }) => {
  const history = useHistory();

  const filtersOnChange = (e) => {
    const value = e.target.value;
    history.push(`/${locale}/baku/${value}`);
  };

  const [t] = useTranslation();

  const options = [
    {
      input: {
        id: `sale`,
        name: 'dealType',
        value: `sale`,
        checked: dealType === 'sale' || !dealType,
      },
      label: t('postList.dealTypes.sale'),
      icon: <SvgSale width={'2em'} height={'2em'} />,
    },
    {
      input: {
        id: `rent`,
        name: 'dealType',
        value: `rent`,
        checked: dealType === 'rent',
      },
      label: t('postList.dealTypes.rent'),
      icon: <SvgRent width={'2em'} height={'2em'} />,
    },
    {
      input: {
        id: `rentPerDay`,
        name: 'dealType',
        value: `rentPerDay`,
        checked: dealType === 'rentPerDay',
      },
      label: t('postList.dealTypes.rentPerDay'),
      icon: <SvgRentPerDay width={'2em'} height={'2em'} />,
    },
  ];

  return (
    <form>
      <h4 className="filter-title">{t('postList.filters.dealType')}</h4>
      <div className="estate-type estate-type-filters">
        <Radio options={options} size="lg" onChange={filtersOnChange} />
      </div>
    </form>
  );
};

DealTypeFilter.propTypes = {
  dealType: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  dealType: state.post.posts.filters.dealType,
  locale: state.locale.locale,
});

export default connect(mapStateToProps)(DealTypeFilter);
