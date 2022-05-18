import React, { useMemo } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import StyledCarousel from '../../components/layout/StyledCarousel';
import { fetchPost } from '../../actions/posts';
import useWindowSize from '../../utils/hooks/useWindowSize';
import { Post } from '../../types';

interface PostDetailedProps {
  post: Post;
}

const PostDetailed: NextPage<PostDetailedProps> = ({ post }) => {
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
    <Container sx={{ pt: 10 }}>
      <StyledCarousel
        images={post.images}
        imageSize={width && width >= 900 ? 640 : 320}
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
