import React, { FC, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import StyledCarousel from './StyledCarousel';
import { Post } from '../types';

const PostItem: FC<{ post: Post }> = ({ post }) => {
  const [elevation, setElevation] = useState<number>(0);

  const onMouseOver = () => {
    return setElevation(6);
  };

  const onMouseOut = () => {
    return setElevation(0);
  };

  return (
    <Card
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      elevation={elevation}
      sx={{
        borderRadius: '10px',
        my: { xs: 2, md: 3 },
        p: { xs: 0, md: 2 },
      }}
    >
      <Grid
        container
        sx={{
          direction: {
            xs: 'column',
            md: 'row',
          },
        }}
      >
        <Grid item xs={12} md={6}>
          <StyledCarousel
            images={post.images}
            imageSize={320}
            thumbSize={150}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <CardContent>
            <Typography>Hello There</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PostItem;
