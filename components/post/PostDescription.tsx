import React, { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MaterialLink from '@mui/material/Link';
import { Post } from '../../types';

const PostDescription: FC<{ post: Post }> = ({ post }) => {
  const { t } = useTranslation();

  if (!post.description && !post.isExternal) return null;

  return (
    <Box sx={{ my: 3 }}>
      <Typography fontWeight={'bold'} fontSize={24} sx={{ mb: 0.5 }}>
        {t('post:description')}
      </Typography>
      {post.isExternal && (
        <MaterialLink href={`${post.source}`} underline="none" target="_blank">
          {post.source}
        </MaterialLink>
      )}
      <Typography sx={{ wordWrap: 'break-word' }}>
        {post.description}
      </Typography>
    </Box>
  );
};

export default PostDescription;
