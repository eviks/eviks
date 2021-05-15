import React from 'react'
import { SvgLogo } from '../../icons'
import SkeletonLine from '../skeletonLine.component'

const SkeletonPost = () => {
  return (
    <div className="container container-sm">
      <div className="my-1 px-2">
        <SkeletonLine />
      </div>
      <div className="my-1 px-2">
        <SkeletonLine />
      </div>
      <div style={{ position: 'relative', height: '50vh' }}>
        <div className="skeleton-image px-2">
          <SvgLogo width={'6em'} height={'6em'} className="skeleton-icon" />
          <SkeletonLine />
        </div>
      </div>
      <div className="my-1 px-2">
        <SkeletonLine />
      </div>
      <div className="my-1 px-2">
        <SkeletonLine />
      </div>
      <div className="my-1 px-2">
        <SkeletonLine />
      </div>
    </div>
  )
}

export default SkeletonPost
