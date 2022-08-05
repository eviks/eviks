import React, { useMemo, useState, useContext } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Hidden from '@mui/material/Hidden';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack';
import StyledCarousel from '../../components/layout/StyledCarousel';
import PostInfoCard from '../../components/post/PostInfoCard';
import PostPrice from '../../components/post/PostPrice';
import PostContacts from '../../components/post/PostContacts';
import PostTitle from '../../components/post/PostTitle';
import PostMainInfo from '../../components/post/PostMainInfo';
import PostDescription from '../../components/post/PostDescription';
import PostGeneralInfo from '../../components/post/PostGeneralInfo';
import PostAdditionalInfo from '../../components/post/PostAdditionalInfo';
import PostBuildingInfo from '../../components/post/PostBuildingInfo';
import FavoriteButton from '../../components/postButtons/FavoriteButton';
import EditPostButton from '../../components/postButtons/EditPostButton';
import DeletePostButton from '../../components/postButtons/DeletePostButton';
import { fetchPost, fetchPostPhoneNumber } from '../../actions/posts';
import { AppContext } from '../../store/appContext';
import useWindowSize from '../../utils/hooks/useWindowSize';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';
import { Post } from '../../types';

const PostDetailed: NextPage<{ post: Post }> = ({ post }) => {
  const { width } = useWindowSize();

  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const {
    state: {
      auth: { user, isInit },
    },
  } = useContext(AppContext);

  const mapHeight = width && width >= 900 ? 400 : 200;

  const PostMap = useMemo(() => {
    return dynamic(import('../../components/post/PostMap'), {
      ssr: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapHeight]);

  const [phoneNumber, setPhoneNumber] = useState('');

  const getPhoneNumber = async () => {
    try {
      const result = await fetchPostPhoneNumber(post._id.toString());
      setPhoneNumber(result.phoneNumber);
      window.location.href = `tel:${result.phoneNumber}`;
    } catch (error) {
      let errorMessage = '';
      if (error instanceof Failure) {
        errorMessage = error.message;
      } else if (error instanceof ServerError) {
        errorMessage = t('common:serverError');
      } else {
        errorMessage = t('common:unknownError');
      }
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  if (!post) return null;

  return (
    <Container sx={{ mt: 12, mb: 6, maxWidth: '1300px' }} maxWidth={false}>
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
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <StyledCarousel
              images={post.images}
              imageSize={width && width >= 900 ? 1280 : 640}
              thumbSize={150}
              height={width && width >= 900 ? '500px' : '320px'}
            />
            <Hidden lgUp>
              <Box
                sx={{
                  position: 'absolute',
                  right: '0',
                  top: '0',
                  p: 2,
                }}
              >
                {isInit &&
                  (user?._id === post.user ? (
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                      <EditPostButton postId={post._id} />
                      <DeletePostButton postId={post._id} />
                    </Box>
                  ) : (
                    <FavoriteButton postId={post._id} />
                  ))}
              </Box>
            </Hidden>
          </Box>
          <Hidden lgUp>
            <PostPrice post={post} />
          </Hidden>
          <PostMainInfo post={post} />
          <Hidden lgUp>
            <PostContacts
              post={post}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
          </Hidden>
          <PostDescription post={post} />
          <PostGeneralInfo post={post} />
          <PostAdditionalInfo post={post} />
          <PostBuildingInfo post={post} />
          <PostMap post={post} height={mapHeight} />
          <Hidden mdUp>
            <Box
              sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                zIndex: 1000,
                mb: 2,
                px: 2,
                width: '100%',
              }}
            >
              <Button
                variant="contained"
                fullWidth
                disableElevation
                onClick={getPhoneNumber}
                sx={{ py: 1.2 }}
              >
                {t('post:call')}
              </Button>
            </Box>
          </Hidden>
        </Grid>
        <Hidden lgDown>
          <Grid item xs={0} md={4}>
            <PostInfoCard
              post={post}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
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

  if (!post)
    // 404
    return {
      notFound: true,
    };

  return { props: { post } };
};

export default PostDetailed;
