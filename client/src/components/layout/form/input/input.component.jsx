import React, { useState } from 'react'
import CurrencyInput from './currency.component'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import './input.style.scss'

const Input = ({
  fieldName,
  options,
  onChange,
  onBlur,
  onFocus,
  required = true,
  main = false,
  currency = false
}) => {
  const [filled, setFilledFlag] = useState(true)
  const [t] = useTranslation()

  return (
    <div className="field">
      <label htmlFor={options.name} className="field-name">
        {fieldName}
      </label>
      {currency ? (
        <CurrencyInput
          className={`input-field${main ? '-main' : ''} ${!filled &&
            'not-field'}`}
          {...options}
          onChange={e => {
            setFilledFlag(true)
            onChange(e)
          }}
          onBlur={e => {
            if (onBlur) {
              onBlur(e)
            }
            setFilledFlag(e.target.value || !required)
          }}
          onFocus={e => {
            if (onFocus) {
              onFocus(e)
            }
          }}
        />
      ) : (
        <input
          className={`input-field${main ? '-main' : ''} ${!filled &&
            'not-field'}`}
          {...options}
          onChange={e => {
            setFilledFlag(true)
            onChange(e)
          }}
          onBlur={e => {
            if (onBlur) {
              onBlur(e)
            }
            setFilledFlag(e.target.value || !required)
          }}
          onFocus={e => {
            if (onFocus) {
              onFocus(e)
            }
          }}
        />
      )}

      {!filled && (
        <div className="field-required">{t('form.requiredField')}</div>
      )}
    </div>
  )
}

Input.propTypes = {
  fieldName: PropTypes.string,
  options: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  required: PropTypes.bool,
  main: PropTypes.bool,
  currency: PropTypes.bool
}

export default Input
