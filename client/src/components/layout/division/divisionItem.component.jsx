import React from 'react'
import PropTypes from 'prop-types'

const DivisionItem = ({
  item,
  primary = false,
  className = '',
  onDivisionSelect
}) => {
  const { name } = item

  return (
    <button
      className={`${className} ${primary ? 'btn btn-ghost-pm btn-md' : 'link'}`}
      onClick={() => onDivisionSelect(item)}
    >
      {name}
    </button>
  )
}

DivisionItem.propTypes = {
  item: PropTypes.object.isRequired,
  primary: PropTypes.bool,
  className: PropTypes.string,
  onDivisionSelect: PropTypes.func.isRequired
}

export default DivisionItem
