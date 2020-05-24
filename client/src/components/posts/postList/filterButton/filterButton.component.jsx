import React, { useRef } from 'react'
import MoreFilters from '../filters/moreFilters.component'
import QuickFilter from '../quickFilter/quickFilter.component'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'

const FilterButton = ({
  name,
  filter,
  setFilter,
  component: Component,
  moreFilters,
}) => {
  const filterOnClick = () => {
    if (filter === name) {
      setFilter('')
    } else {
      setFilter(name)
    }
  }

  const isOpen = filter === name

  const filterButtonRef = useRef(null)

  return (
    <div ref={filterButtonRef} style={{ position: 'relative' }}>
      <button
        onClick={() => filterOnClick()}
        className={`btn btn-ghost-pm${isOpen ? '-active' : ''} btn-md`}
      >
        {name}
      </button>
      {isOpen &&
        (moreFilters ? (
          <ReactModal
            isOpen={isOpen}
            onRequestClose={() => {
              setFilter('')
            }}
            className="modal"
            overlayClassName="modal-overlay"
          >
            <MoreFilters filterOnClick={filterOnClick} />
          </ReactModal>
        ) : (
          <QuickFilter
            filterOnClick={filterOnClick}
            component={Component}
            filterButtonRef={filterButtonRef}
          />
        ))}
    </div>
  )
}

FilterButton.defaultProps = {
  moreFilters: false,
}

FilterButton.propTypes = {
  name: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  moreFilters: PropTypes.bool,
}

export default FilterButton
