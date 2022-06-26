import React, { useMemo } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Hidden from '@mui/material/Hidden';
import StyledCarousel from '../../components/layout/StyledCarousel';
import PostInfoCard from '../../components/post/PostInfoCard';
import PostTitle from '../../components/post/PostTitle';
import PostMainInfo from '../../components/post/PostMainInfo';
import PostDescription from '../../components/post/PostDescription';
import PostGeneralInfo from '../../components/post/PostGeneralInfo';
import PostBuildingInfo from '../../components/post/PostBuildingInfo';
import { fetchPost } from '../../actions/posts';
import useWindowSize from '../../utils/hooks/useWindowSize';
import { Post } from '../../types';

const PostDetailed: NextPage<{ post: Post }> = ({ post }) => {
  const { width } = useWindowSize();

  const mapHeight = width && width >= 900 ? 400 : 200;

  const PostMap = useMemo(() => {
    return dynamic(import('../../components/post/PostMap'), {
      ssr: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapHeight]);

  if (!post) return null;
  return (
    <Container
      sx={{ pt: { xs: 6, md: 12 }, maxWidth: '1300px' }}
      maxWidth={false}
    >
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
          <PostMainInfo post={post} />
          <PostDescription post={post} />
          <PostGeneralInfo post={post} />
          <PostBuildingInfo post={post} />
          <PostMap post={post} height={mapHeight} />
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

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const postId = params?.id as string;

  const post = await fetchPost(postId);

  if (!post) return { redirect: '/posts', permanent: false, props: {} };

  return { props: { post } };
};

export default PostDetailed;
