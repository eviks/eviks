import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MetroIcon from '../icons/MetroIcon';
import { getSettlementPresentation, getMetroPresentation } from '../../utils';
import { Post } from '../../types';

const PostTitle: FC<{ post: Post; title: string }> = ({ post, title }) => {
  const router = useRouter();

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h1" fontSize={28} fontWeight={500}>
        {title}
      </Typography>

      <Typography
        variant="subtitle1"
        fontSize={16}
        color={(theme) => {
          return theme.palette.text.secondary;
        }}
      >
        {`${getSettlementPresentation(post.city, router.locale)}, ${
          post.address
        }`}
      </Typography>

      {post.metroStation && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MetroIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1" fontSize={16}>
            {getMetroPresentation(post.metroStation, router.locale)}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PostTitle;
