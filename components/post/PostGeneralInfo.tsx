import React, { FC, Fragment } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Typography from '@mui/material/Typography';
import PostInfoRow from './PostInfoRow';
import { EstateType, Post } from '../../types';

const PostGeneralInfo: FC<{ post: Post }> = ({ post }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Typography fontWeight={'bold'} fontSize={24} sx={{ mb: 0.5 }}>
        {t('post:postDetailGeneral')}
      </Typography>
      <PostInfoRow
        label={t('post:dealTypeTitle')}
        value={t(`post:${post.dealType}Type`)}
      />
      <PostInfoRow
        label={t('post:estateTypeTitle')}
        value={t(`post:${post.estateType}`)}
      />
      {post.estateType === EstateType.apartment && (
        <PostInfoRow
          label={t('post:apartmentType')}
          value={t(`post:${post.apartmentType}`)}
        />
      )}
      <PostInfoRow label={t('post:rooms')} value={post.rooms.toString()} />
      <PostInfoRow
        label={t('post:sqm')}
        value={`${post.sqm?.toString() ?? ''} ${t('post:m2')}`}
      />
      {(post.livingRoomsSqm ?? 0) > 0 && (
        <PostInfoRow
          label={t('post:livingRoomsSqm')}
          value={`${post.livingRoomsSqm?.toString() ?? ''} ${t('post:m2')}`}
        />
      )}
      {(post.kitchenSqm ?? 0) > 0 && (
        <PostInfoRow
          label={t('post:kitchenSqm')}
          value={`${post.kitchenSqm?.toString() ?? ''} ${t('post:m2')}`}
        />
      )}
      {post.estateType === EstateType.house && (
        <Fragment>
          {(post.lotSqm ?? 0) > 0 && (
            <PostInfoRow
              label={t('post:lotSqm')}
              value={`${post.lotSqm?.toString() ?? ''} ${t('post:acres')}`}
            />
          )}
          {(post.totalFloors ?? 0) > 0 && (
            <PostInfoRow
              label={t('post:totalFloorsInHouse')}
              value={`${post.totalFloors?.toString() ?? ''}`}
            />
          )}
        </Fragment>
      )}
      <PostInfoRow
        label={t('post:renovation')}
        value={t(`post:${post.renovation.toString()}`)}
      />
      <PostInfoRow
        label={t('post:document')}
        value={post.documented ? t('post:true') : t('post:false')}
      />
    </Fragment>
  );
};

export default PostGeneralInfo;
