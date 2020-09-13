import React, { useRef } from 'react'
import MoreFilters from '../filters/moreFilters.component'
import QuickFilter from '../quickFilter/quickFilter.component'
import ReactModal from 'react-modal'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

const FilterButton = ({
  name,
  filter,
  setFilter,
  component: Component,
  moreFilters
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
      {moreFilters ? (
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
        <CSSTransition
          in={isOpen}
          timeout={400}
          classNames="vertical-transition"
          unmountOnExit
        >
          <QuickFilter
            filterOnClick={filterOnClick}
            component={Component}
            filterButtonRef={filterButtonRef}
          />
        </CSSTransition>
      )}
    </div>
  )
}

FilterButton.defaultProps = {
  moreFilters: false
}

FilterButton.propTypes = {
  name: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  moreFilters: PropTypes.bool
}

export default FilterButton
