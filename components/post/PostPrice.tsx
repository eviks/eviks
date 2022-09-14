import React, { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formatter } from '../../utils';
import { Post } from '../../types';

const PostPrice: FC<{ post: Post }> = ({ post }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ my: 3 }}>
      <Typography
        variant="h2"
        fontWeight={'bold'}
        fontSize={32}
        sx={{ mb: 0.5 }}
      >
        {formatter.format(post.price)}
      </Typography>
      <Typography
        variant="subtitle1"
        fontSize={16}
        color={(theme) => {
          return theme.palette.text.secondary;
        }}
      >
        {t('post:priceForM2', {
          price: formatter.format(post.price / post.sqm),
        })}
      </Typography>
    </Box>
  );
};

export default PostPrice;
