import React, { forwardRef } from 'react'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import ButtonSpinner from '../../spinner/buttonSpinner.component'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './input.style.scss'

const spinerStyle = {
  position: 'absolute',
  width: '20px',
  bottom: '50%',
  right: '1%',
  transform: 'translateY(50%)'
}

const Input = ({
  fieldName,
  mask,
  options,
  main,
  onChange,
  onBlur,
  onFocus,
  loading = false,
  error = null,
  forwardedRef
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

  const defaultMask = value => value.split('').map(() => /./)

  return (
    <div className="field">
      {fieldName && (
        <label htmlFor={options.name} className="field-name">
          {fieldName}
        </label>
      )}
      <div className="field-input-wrapper">
        <MaskedInput
          ref={forwardedRef}
          mask={mask || defaultMask}
          className={`input-field${main ? '-main' : ''} ${
            error ? 'error' : ''
          }`}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...options}
        />
        {loading && <ButtonSpinner style={spinerStyle} primary={true} />}
      </div>
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
    decimalSymbol: ',',
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
  loading: PropTypes.bool,
  error: PropTypes.string
}

export default forwardRef((props, ref) => (
  <Input {...props} forwardedRef={ref} />
))
