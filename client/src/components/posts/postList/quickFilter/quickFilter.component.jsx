import React from 'react'
import PropTypes from 'prop-types'

const QuickFilter = ({ component: Component, filterOnClick }) => {
  return (
    <div
      className="light-border"
      style={{
        marginTop: '0.7rem',
        padding: '1.5rem',
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: '10',
        borderRadius: '8px'
      }}
    >
      <Component />
      <div>
        <button
          className="btn btn-primary btn-md"
          onClick={() => filterOnClick()}
        >
          Done
        </button>
      </div>
    </div>
  )
}

QuickFilter.propTypes = {
  filterOnClick: PropTypes.func.isRequired
}

export default QuickFilter
