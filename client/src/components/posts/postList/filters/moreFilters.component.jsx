import React from 'react';
import MoreFiltersForm from './moreFiltersForm.component';
import { SvgClose } from '../../../layout/icons';
import styled, { keyframes } from 'styled-components';
import { fadeInDown } from 'react-animations';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import './filters.style.scss';

const FadeInDownAnimation = keyframes`${fadeInDown}`;
const FadeInDownDiv = styled.div`
  animation: 0.5s ${FadeInDownAnimation};
`;

const MoreFilters = ({ filterOnClick }) => {
  const [t] = useTranslation();

  return (
    <FadeInDownDiv>
      <div className="more-filters-popup">
        <div className="more-filters-container">
          <div className="more-filters-header light-shadow-border">
            <div>
              <span className="text-bold">
                {t('postList.filters.additionalFilters')}
              </span>
            </div>
            <button className="close-modal" onClick={() => filterOnClick()}>
              <SvgClose />
            </button>
          </div>
          <MoreFiltersForm />
          <div className="more-filters-footer">
            <button
              className="btn btn-white btn-md"
              onClick={() => {
                filterOnClick();
              }}
            >
              {t('postList.filters.doneButton')}
            </button>
          </div>
        </div>
      </div>
    </FadeInDownDiv>
  );
};

MoreFilters.propTypes = {
  filterOnClick: PropTypes.func.isRequired,
};

export default MoreFilters;
