import React from 'react';
import Input from '../../../layout/form/input/input.component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const MinMaxFilter = ({
  filters,
  className = 'filter-block',
  title,
  mask = false,
  onChange,
  onBlur,
  minInput,
  maxInput,
}) => {
  const getInputOptions = (inputName, placeholder = '') => {
    return {
      type: 'text',
      min: 0,
      name: inputName,
      value: filters[inputName] === 0 ? '' : filters[inputName],
      placeholder: placeholder,
    };
  };

  const handleOnChange = (event) => {
    if (onChange) onChange(event);
  };

  const handleOnBlur = (event) => {
    if (onBlur) onBlur(event);
  };

  return (
    <div className={className}>
      <h4>{title}</h4>
      <div className="filter-inputs">
        <Input
          mask={mask}
          options={getInputOptions(minInput.name, minInput.placeholder)}
          required={false}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        <span className="input-separator">-</span>
        <Input
          mask={mask}
          options={getInputOptions(maxInput.name, maxInput.placeholder)}
          required={false}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
      </div>
    </div>
  );
};

MinMaxFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  minInput: PropTypes.object.isRequired,
  maxInput: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  filters: state.post.posts.filters,
});

export default connect(mapStateToProps)(MinMaxFilter);
