import React from 'react'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

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
  const [t] = useTranslation()

  const handleChange = event => {
    if (onChange) onChange(event)
  }

  const handleBlur = event => {
    if (onBlur) onBlur(event)
  }

  const handleFocus = event => {
    if (onFocus) onFocus(event)
  }

  return (
    <div className="field">
      <label htmlFor={options.name} className="field-name">
        {fieldName}
      </label>
      <MaskedInput
        mask={mask}
        className={`input-field${main ? '-main' : ''} ${error && 'not-field'}`}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...options}
      />
      {error && <div className="field-required">{t('form.requiredField')}</div>}
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
  required: true,
  main: false
}

Input.propTypes = {
  fieldName: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  options: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  required: PropTypes.bool,
  main: PropTypes.bool,
  error: PropTypes.bool
}

export default Input
