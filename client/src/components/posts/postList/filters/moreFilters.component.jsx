import React from 'react'
import MoreFiltersForm from './moreFiltersForm.component'
import styled, { keyframes } from 'styled-components'
import { fadeInDown } from 'react-animations'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './filters.style.scss'

const FadeInDownAnimation = keyframes`${fadeInDown}`
const FadeInDownDiv = styled.div`
  animation: 0.5s ${FadeInDownAnimation};
`

const MoreFilters = ({ filterOnClick }) => {
  const [t] = useTranslation()

  return (
    <FadeInDownDiv>
      <div className="more-filters-popup">
        <div className="more-filters-container">
          <MoreFiltersForm />
          <div className="filter-footer">
            <button
              className="btn btn-white btn-md"
              onClick={() => {
                filterOnClick()
              }}
            >
              {t('postList.filters.doneButton')}
            </button>
          </div>
        </div>
      </div>
      <button
        className="close-modal"
        style={{ top: '-3%', right: '-5%' }}
        onClick={() => filterOnClick()}
      >
        <i className="fas fa-times"></i>
      </button>
    </FadeInDownDiv>
  )
}

MoreFilters.propTypes = {
  filterOnClick: PropTypes.func.isRequired
}

export default MoreFilters
