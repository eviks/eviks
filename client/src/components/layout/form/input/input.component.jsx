import React from 'react'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './input.style.scss'

const Input = ({
  fieldName,
  mask,
  options,
  main,
  onChange,
  onBlur,
  onFocus,
  error = null
}) => {
  const handleChange = event => {
    if (onChange) onChange(event)
  }

  const handleBlur = event => {
    if (onBlur) onBlur(event)
  }

  const handleFocus = event => {
    if (onFocus) onFocus(event)
  }

  const [t] = useTranslation()

  return (
    <div className="field">
      {fieldName && (
        <label htmlFor={options.name} className="field-name">
          {fieldName}
        </label>
      )}
      <MaskedInput
        mask={mask}
        className={`input-field${main ? '-main' : ''} ${error ? 'error' : ''}`}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...options}
      />
      {error && <div className="field-required">{t(error)}</div>}
    </div>
  )
}

Input.defaultProps = {
  mask: createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    thousandsSeparatorSymbol: ' ',
    allowDecimal: false,
    decimalSymbol: '.',
    decimalLimit: 0, // how many digits allowed after the decimal
    integerLimit: 15, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false
  }),
  main: false
}

Input.propTypes = {
  fieldName: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  options: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  main: PropTypes.bool,
  error: PropTypes.string
}

export default Input
