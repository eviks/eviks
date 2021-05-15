import React from 'react'
import ArrowButton from './arrowButton.component'
import { SvgArrowLeft, SvgArrowRight } from '../icons'

export const renderLeftNav = (onClick, disabled) => {
  return (
    <ArrowButton
      icon={SvgArrowLeft}
      onClick={onClick}
      disabled={disabled}
      classNameWrapper="arrow-wrapper-transparent arrow-wrapper-transparent-left"
      classNameButton="arrow-btn-transparent"
    />
  )
}

export const renderRightNav = (onClick, disabled) => {
  return (
    <ArrowButton
      icon={SvgArrowRight}
      onClick={onClick}
      disabled={disabled}
      classNameWrapper="arrow-wrapper-transparent arrow-wrapper-transparent-right"
      classNameButton="arrow-btn-transparent"
    />
  )
}
