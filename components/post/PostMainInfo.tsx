import React, { FC, Fragment } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { EstateType, Post } from '../../types';

const MainInfo: FC<{ value: string; hint: string }> = ({ value, hint }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography fontSize={24} fontWeight={500}>
        {value}
      </Typography>
      <Typography
        fontSize={16}
        color={(theme) => {
          return theme.palette.text.secondary;
        }}
      >
        {hint}
      </Typography>
    </Box>
  );
};

const PostMainInfo: FC<{ post: Post }> = ({ post }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Box sx={{ display: 'flex', gap: 5, my: 3 }}>
        <MainInfo value={post.rooms.toString()} hint={t('post:roomsShort')} />
        <MainInfo
          value={`${post.sqm.toString()} ${t('post:m2')}`}
          hint={t('post:sqmShort')}
        />
        {post.livingRoomsSqm ? (
          <MainInfo
            value={`${post.livingRoomsSqm.toString()} ${t('post:m2')}`}
            hint={t('post:livingRoomsSqmShort')}
          />
        ) : null}
        {post.kitchenSqm ? (
          <MainInfo
            value={`${post.kitchenSqm.toString()} ${t('post:m2')}`}
            hint={t('post:kitchenSqmShort')}
          />
        ) : null}
        {post.estateType === EstateType.apartment && (
          <MainInfo
            value={`${post.floor?.toString()}/${post.totalFloors?.toString()}`}
            hint={t('post:floor')}
          />
        )}
        {post.estateType === EstateType.house && (
          <MainInfo
            value={`${post.lotSqm?.toString()} ${t('post:m2')}`}
            hint={t('post:lotSqmShort')}
          />
        )}
        {post.estateType === EstateType.house &&
          (post.totalFloors ?? 0) > 1 && (
            <MainInfo
              value={post.totalFloors?.toString() ?? ''}
              hint={t('post:totalFloorsShort')}
            />
          )}
      </Box>
      <Divider />
    </Fragment>
  );
};

export default PostMainInfo;
