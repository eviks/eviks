import React from 'react'
import SkeletonLine from '../skeletonLine.component'

const SkeletonPost = () => {
  return (
    <div className="container">
      <div className="my-1 px-2">
        <SkeletonLine />
      </div>
      <div className="my-1 px-2">
        <SkeletonLine />
      </div>
      <div style={{ position: 'relative', height: '70vh' }}>
        <div className="skeleton-image px-2">
          <i className="fas fa-home fa-5x"></i>
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
