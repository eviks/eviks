import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

const PostHead = ({ post: { estateType, date, address, rooms, sqm } }) => {
  const getPostTitle = () => {
    return `Продается ${rooms}-комнатн${
      estateType === 'house' ? 'ый дом' : 'ая квартира'
    } ${sqm} м²`
  }

  return (
    <div className="my-1 px-2">
      <h1>{getPostTitle()}</h1>
      <div>
        <i className="fas fa-map-marker-alt"></i> {address}
      </div>
      <div className="text-secondary">
        <Moment locale="ru" format="DD MMMM YYYY">
          {date}
        </Moment>
      </div>
    </div>
  )
}

PostHead.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostHead
