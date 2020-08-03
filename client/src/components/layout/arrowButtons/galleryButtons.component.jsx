import React from 'react'
import ArrowButton from './arrowButton.component'

export const renderLeftNav = (onClick, disabled) => {
  return (
    <ArrowButton
      type="left"
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
      type="right"
      onClick={onClick}
      disabled={disabled}
      classNameWrapper="arrow-wrapper-transparent arrow-wrapper-transparent-right"
      classNameButton="arrow-btn-transparent"
    />
  )
}
