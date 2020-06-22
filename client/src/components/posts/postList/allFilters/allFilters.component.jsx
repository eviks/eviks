import React from 'react'
import PriceFilter from '../filters/priceFilter.component'
import RoomFilter from '../filters/roomFilter.component'
import EstateTypeFilter from '../filters/estateTypeFilter.component'
import MoreFiltersForm from '../filters/moreFiltersForm.component'
import styled, { keyframes } from 'styled-components'
import { fadeInDown } from 'react-animations'

import './allFilters.style.scss'

const FadeInDownAnimation = keyframes`${fadeInDown}`
const FadeInDownDiv = styled.div`
  animation: 0.4s ${FadeInDownAnimation};
`

const AllFilters = () => {
  return (
    <FadeInDownDiv className="all-filters">
      <PriceFilter />
      <RoomFilter />
      <EstateTypeFilter />
      <MoreFiltersForm />
    </FadeInDownDiv>
  )
}

export default AllFilters
