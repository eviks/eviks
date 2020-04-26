import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import './input.style.scss'

const TextInput = ({
  fieldName,
  options,
  onChange,
  onBlur,
  onFocus,
  required = true
}) => {
  const [filled, setFilledFlag] = useState(true)
  const [t] = useTranslation()
  return (
    <div className="field">
      <div className="field-name">{fieldName}</div>
      <input
        className={`input-field ${!filled && 'not-field'}`}
        type="text"
        {...options}
        onChange={e => onChange(e)}
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
      {!filled && (
        <div className="field-required">{t('form.requiredField')}</div>
      )}
    </div>
  )
}

TextInput.propTypes = {
  fieldName: PropTypes.string,
  options: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  required: PropTypes.bool
}

export default TextInput
