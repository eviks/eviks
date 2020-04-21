import React, { useEffect } from 'react'
import { setSrearchFilters, getPosts } from '../../../../actions/post'
import { connect } from 'react-redux'
import useIsMount from '../../../layout/useIsMount/useIsMount.component'
import Radio from '../../../layout/form/radio/radio.component'

import './filters.style.scss'

const RoomFilter = ({ filters, setSrearchFilters, getPosts }) => {
  const { rooms } = filters

  const isMount = useIsMount()

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
    setSrearchFilters({
      rooms: numberOfRooms === rooms ? 0 : numberOfRooms
    })
  }

  useEffect(() => {
    if (!isMount) {
      getPosts(filters)
    }
  }, [filters, getPosts, isMount])

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

  return (
    <form>
      <h4 style={styles.title}>Rooms</h4>
      <div className="row-group" style={{ marginBottom: '1rem' }}>
        <Radio options={options} onChange={filtersOnChange} />
      </div>
    </form>
  )
}

const styles = {
  title: { marginLeft: '0.8rem', marginBottom: '1rem' },
  input: { width: '120px', marginLeft: '0.7rem', marginRight: '0.7rem' }
}

const mapStateToProps = state => ({
  filters: state.post.filters
})

export default connect(mapStateToProps, { setSrearchFilters, getPosts })(
  RoomFilter
)
