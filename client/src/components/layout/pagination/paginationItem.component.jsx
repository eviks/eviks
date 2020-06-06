import React from 'react'
import PropTypes from 'prop-types'

const PaginationItem = ({
  page,
  next = false,
  prev = false,
  onClick,
  className
}) => {
  const getItemText = () => {
    if (next) {
      return <i className="fas fa-angle-right"></i>
    }

    if (prev) {
      return <i className="fas fa-angle-left"></i>
    }

    return page
  }

  const handleOnClick = () => {
    if (!onClick) return
    onClick(page)
  }

  return (
    <div className={className} onClick={handleOnClick}>
      {getItemText()}
    </div>
  )
}

PaginationItem.propTypes = {
  page: PropTypes.number.isRequired,
  next: PropTypes.bool,
  prev: PropTypes.number,
  onClick: PropTypes.func,
  className: PropTypes.string.isRequired
}

export default PaginationItem
