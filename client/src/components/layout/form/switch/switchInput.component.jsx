import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './switchInput.style.scss'

const SwitchInput = ({ fieldName, options, onChange, error = null }) => {
  const [t] = useTranslation()

  return (
    <div className="field">
      <div className="field-name">{fieldName}</div>
      <div className="radio-group">
        {options.map(option => (
          <Fragment key={option.input.id}>
            <input {...option.input} onChange={e => onChange(e)} />
            <label htmlFor={option.input.id}>{option.label}</label>
          </Fragment>
        ))}
      </div>
      {error && <div className="field-required">{t('form.requiredField')}</div>}
    </div>
  )
}

SwitchInput.propTypes = {
  fieldName: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  error: PropTypes.bool
}

export default SwitchInput
