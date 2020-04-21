import React from 'react'
import PropTypes from 'prop-types'

const FilterButton = ({ name, filter, setFilter, component: Component }) => {
  const filterOnClick = val => {
    if (filter === val) {
      setFilter('')
    } else {
      setFilter(val)
    }
  }

  const isOpen = filter === name

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => filterOnClick(name)}
        className={`btn btn-ghost-pm${isOpen ? '-active' : ''} btn-md`}
      >
        {name}
      </button>
      {isOpen && (
        <div
          className="light-border"
          style={{
            marginTop: '0.7rem',
            padding: '1rem',
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
              onClick={() => filterOnClick(name)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

FilterButton.propTypes = {
  name: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired
}

export default FilterButton
