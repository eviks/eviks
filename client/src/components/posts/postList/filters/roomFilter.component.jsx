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

  const getNumberOfRooms = value => {
    switch (value) {
      case 'room1':
        return 1
      case 'room2':
        return 2
      case 'room3':
        return 3
      case 'room4':
        return 4
      case 'room5':
        return 5
      default:
        return 0
    }
  }

  const filtersOnChange = e => {
    const numberOfRooms = getNumberOfRooms(e.target.value)
    updateURLParams(
      { rooms: numberOfRooms === rooms ? 0 : numberOfRooms },
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
        value: `room${index}`,
        checked: rooms === getNumberOfRooms(`room${index}`)
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
