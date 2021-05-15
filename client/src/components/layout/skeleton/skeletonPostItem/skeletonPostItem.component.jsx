import React from 'react'
import { SvgLogo } from '../../icons'
import SkeletonLine from '../skeletonLine.component'

import './skeletonPostItem.style.scss'

const PostItemSkeleton = () => {
  return (
    <div className="card">
      <div className="skeleton-images">
        <div className="skeleton-image px-1 py-1">
          <SvgLogo width={'6em'} height={'6em'} className="skeleton-icon" />
          <SkeletonLine />
        </div>
      </div>
      <div className="skeleton-content">
        <div className="mb-05">
          <SkeletonLine />
        </div>
        <div className="mb-05">
          <SkeletonLine />
        </div>
        <div className="mb-1">
          <SkeletonLine />
        </div>
      </div>
    </div>
  )
}

export default PostItemSkeleton
