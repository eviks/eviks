import React, { FC, Fragment } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Typography from '@mui/material/Typography';
import PostInfoRow from './PostInfoRow';
import { Post } from '../../types';

const PostBuildingInfo: FC<{ post: Post }> = ({ post }) => {
  const { t } = useTranslation();

  if (
    !post.yearBuild &&
    !post.ceilingHeight &&
    !post.elevator &&
    !post.parkingLot
  )
    return null;

  return (
    <Fragment>
      <Typography fontWeight={'bold'} fontSize={24} sx={{ mb: 0.5 }}>
        {t('post:buildingInfo')}
      </Typography>
      {(post.yearBuild ?? 0) > 0 && (
        <PostInfoRow
          label={t('post:yearBuild')}
          value={post.yearBuild?.toString() ?? ''}
        />
      )}
      {(post.ceilingHeight ?? 0) > 0 && (
        <PostInfoRow
          label={t('post:ceilingHeight')}
          value={`${post.ceilingHeight?.toString() ?? ''} ${t('post:metre')}`}
        />
      )}
      {(post.elevator ?? 0) > 0 && (
        <PostInfoRow label={t('post:elevator')} value={t('post:true')} />
      )}
      {(post.parkingLot ?? 0) > 0 && (
        <PostInfoRow label={t('post:parkingLot')} value={t('post:true')} />
      )}
    </Fragment>
  );
};

export default PostBuildingInfo;
