import React from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './textarea.style.scss'

const Textarea = ({ fieldName, options, onChange, error = null }) => {
  const [t] = useTranslation()

  return (
    <div className="field">
      <div className="field-name">{fieldName}</div>
      <textarea
        className={`textarea-field ${error ? 'error' : ''}`}
        {...options}
        onChange={e => onChange(e)}
      ></textarea>
      {error && (
        <div className="field-required">{t('form.textareaMinLength')}</div>
      )}
    </div>
  )
}

Textarea.propTypes = {
  fieldName: PropTypes.string,
  options: PropTypes.object,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default Textarea
