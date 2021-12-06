import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import './textarea.style.scss';

const Textarea = ({
  fieldName,
  options,
  onChange,
  error = null,
  wrapperStyle = null,
}) => {
  const [t] = useTranslation();

  return (
    <div className="field" style={wrapperStyle}>
      <div className="field-name">{fieldName}</div>
      <textarea
        className={`textarea-field ${error ? 'textarea-field-error' : ''}`}
        {...options}
        onChange={(e) => onChange(e)}
      ></textarea>
      {error && (
        <div className="field-required">{t('form.textareaMinLength')}</div>
      )}
    </div>
  );
};

Textarea.propTypes = {
  fieldName: PropTypes.string,
  options: PropTypes.object,
  onChange: PropTypes.func,
  error: PropTypes.string,
  wrapperStyle: PropTypes.object,
};

export default Textarea;
