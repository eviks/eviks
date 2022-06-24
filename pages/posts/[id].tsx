import React, { useMemo } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Hidden from '@mui/material/Hidden';
import StyledCarousel from '../../components/layout/StyledCarousel';
import PostInfoCard from '../../components/post/PostInfoCard';
import PostTitle from '../../components/post/PostTitle';
import { fetchPost } from '../../actions/posts';
import useWindowSize from '../../utils/hooks/useWindowSize';
import { Post } from '../../types';

const PostDetailed: NextPage<{ post: Post }> = ({ post }) => {
  const { t } = useTranslation();

  const { width } = useWindowSize();

  const mapHeight = width && width >= 900 ? 400 : 200;

  const PostDetailedMap = useMemo(() => {
    return dynamic(import('../../components/post/PostDetailedMap'), {
      ssr: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapHeight]);

  if (!post) return null;
  return (
    <Container sx={{ pt: 12, maxWidth: '1300px' }} maxWidth={false}>
      <Grid
        container
        alignItems="stretch"
        justifyContent="center"
        sx={{
          marginTop: {
            xs: 5,
            md: 0,
          },
        }}
      >
        <Grid item xs={12} md={8}>
          <PostTitle post={post} />
          <StyledCarousel
            images={post.images}
            imageSize={width && width >= 900 ? 1280 : 640}
            thumbSize={150}
            height={width && width >= 900 ? '500px' : '320px'}
          />
          <Typography
            variant={'h2'}
            fontWeight={'bold'}
            fontSize={'1.5rem'}
            margin={'40px 0 4px'}
          >
            {t('post:location')}
          </Typography>
          <PostDetailedMap post={post} height={mapHeight} />
        </Grid>
        <Hidden lgDown>
          <Grid item xs={0} md={4}>
            <PostInfoCard post={post} />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const postId = params?.id as string;

  const post = await fetchPost(postId);

  return { props: { post } };
};

export default PostDetailed;
