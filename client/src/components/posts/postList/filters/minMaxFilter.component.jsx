import React from 'react'
import Input from '../../../layout/form/input/input.component'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const MinMaxFilter = ({ filters, title, onChange, minInput, maxInput }) => {
  const getInputOptions = (inputName, placeholder = '') => {
    return {
      type: 'number',
      name: inputName,
      value: filters[inputName] === 0 ? '' : filters[inputName],
      min: '0',
      placeholder: placeholder,
      style: { width: '120px' }
    }
  }

  return (
    <div className="filter-block">
      <h4>{title}</h4>
      <div className="filter-inuts">
        <Input
          options={getInputOptions(minInput.name, minInput.placeholder)}
          required={false}
          onChange={onChange}
        />
        <span className="input-separator">-</span>
        <Input
          options={getInputOptions(maxInput.name, maxInput.placeholder)}
          required={false}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

MinMaxFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  title: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  minInput: PropTypes.object.isRequired,
  maxInput: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  filters: state.post.filters
})

export default connect(mapStateToProps)(MinMaxFilter)
