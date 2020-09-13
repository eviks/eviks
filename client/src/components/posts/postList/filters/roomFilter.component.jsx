import React from 'react'
import { useHistory } from 'react-router-dom'
import { updateURLParams } from '../../../../actions/post'
import { connect } from 'react-redux'
import Radio from '../../../layout/form/radio/radio.component'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './filters.style.scss'

const RoomFilter = ({ filters, updateURLParams }) => {
  const history = useHistory()

  const { rooms } = filters

  const filtersOnChange = e => {
    updateURLParams(
      { rooms: e.target.value === rooms ? 0 : e.target.value },
      history
    )
  }

  // Array of options
  const options = []
  for (let index = 1; index <= 5; index++) {
    options.push({
      input: {
        id: `room${index}`,
        name: 'rooms',
        value: index,
        checked: rooms === index
      },
      label: `${index}+`
    })
  }

  const [t] = useTranslation()

  return (
    <form>
      <h4 className="filter-title">{t('postList.filters.rooms')}</h4>
      <div className="row-group room-filters">
        <Radio options={options} onChange={filtersOnChange} />
      </div>
    </form>
  )
}

const mapStateToProps = state => ({
  filters: state.post.posts.filters
})

RoomFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  updateURLParams: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { updateURLParams })(RoomFilter)
