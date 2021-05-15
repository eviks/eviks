import React from 'react'
import SkeletonLine from '../skeletonLine.component'
import { SvgUser } from '../../icons'

const SkeletonAvatar = () => {
  return (
    <div className="user-profile py-1">
      <div className="user-avatar-wrapper">
        <div className="skeleton-image text-light">
          <SvgUser width="4em" height="4em" style={{ position: 'absolute' }} />
          <SkeletonLine />
        </div>
      </div>
      <div className="user-info ml-05">
        <div className="skeleton-content">
          <div className="mb-05">
            <SkeletonLine />
          </div>
          <div className="mb-05">
            <SkeletonLine />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonAvatar
