import React, { Fragment } from 'react';
import SkeletonPostItem from '../skeletonPostItem/skeletonPostItem.component';

const SekeletonPostList = () => {
  return (
    <Fragment>
      <SkeletonPostItem />
      <SkeletonPostItem />
      <SkeletonPostItem />
      <SkeletonPostItem />
      <SkeletonPostItem />
      <SkeletonPostItem />
    </Fragment>
  );
};

export default SekeletonPostList;
