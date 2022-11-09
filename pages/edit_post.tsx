import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import { parseCookies, destroyCookie } from 'nookies';
import { useSnackbar } from 'notistack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';
import CircularProgress from '@mui/material/CircularProgress';
import { AppContext } from '../store/appContext';
import EditPostStepper from '../components/editPost/EditPostStepper';
import EditPostGeneralInfo from '../components/editPost/EditPostGeneralInfo';
import EditPostEstateInfo from '../components/editPost/EditPostEstateInfo';
import EditPostBuildingInfo from '../components/editPost/EditPostBuildingInfo';
import EditPostAdditionalInfo from '../components/editPost/EditPostAdditionalInfo';
import EditPostImages from '../components/editPost/editPostImages/EditPostImages';
import EditPostPrice from '../components/editPost/EditPostPrice';
import EditPostContacts from '../components/editPost/EditPostContacts';
import { initPost } from '../actions/post';
import { fetchPost, fetchUnreviewedPost } from '../actions/posts';
import { loadUserOnServer } from '../actions/auth';
import useWindowSize from '../utils/hooks/useWindowSize';
import Failure from '../utils/errors/failure';
import ServerError from '../utils/errors/serverError';
import { Post } from '../types';

const EditPost: NextPage<{ loadedPost: Post | null; unreviewed: boolean }> = ({
  loadedPost,
  unreviewed,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [isInit, setIsInit] = useState<boolean>(false);

  const {
    state: { post, auth },
    dispatch,
  } = useContext(AppContext);

  const initPage = useCallback(async () => {
    try {
      await initPost(loadedPost)(dispatch);
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
    setIsInit(true);
  }, [dispatch, enqueueSnackbar, loadedPost, t]);

  useEffect(() => {
    initPage();
  }, [initPage]);

  useEffect(() => {
    if (!auth.user && auth.isInit) router.push({ pathname: '/', query: {} });
  }, [auth.isInit, auth.user, router]);

  const { width } = useWindowSize();

  const mapHeight = width && width >= 900 ? 400 : '100vh';

  const fullScreenMode = width !== undefined && width < 900 && post.step === 1;

  const EditPostMap = useMemo(() => {
    return dynamic(import('../components/editPost/editPostMap/EditPostMap'), {
      ssr: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapHeight]);

  const renderStep = () => {
    switch (post.step) {
      case 0:
        return <EditPostGeneralInfo />;
      case 1:
        return <EditPostMap height={mapHeight} />;
      case 2:
        return <EditPostEstateInfo />;
      case 3:
        return <EditPostBuildingInfo />;
      case 4:
        return <EditPostAdditionalInfo />;
      case 5:
        return <EditPostImages unreviewed={unreviewed} />;
      case 6:
        return <EditPostPrice />;
      case 7:
        return <EditPostContacts unreviewed={unreviewed} />;
      default:
        return <EditPostGeneralInfo />;
    }
  };

  if (!isInit)
    return (
      <Fragment>
        <Head>
          <title>{t(`common:projectTitle`)}</title>
        </Head>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
          }}
        >
          <CircularProgress color="primary" size="2rem" />
        </Box>
      </Fragment>
    );

  return (
    <Fragment>
      <Head>
        <title>{t(`common:projectTitle`)}</title>
      </Head>
      <Grid
        container
        sx={{ pt: fullScreenMode ? 0 : 10, pb: fullScreenMode ? 0 : 5 }}
        columns={10}
      >
        <Hidden mdDown>
          <Grid item xs={0} md={2}>
            <Container disableGutters={fullScreenMode} sx={{ mx: 1 }}>
              <EditPostStepper step={post.step ?? 0} />
            </Container>
          </Grid>
        </Hidden>
        <Grid item xs={10} md={8}>
          <Container disableGutters={fullScreenMode}>
            <Box sx={{ p: { xs: 0 } }}>{renderStep()}</Box>
          </Container>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const user = await loadUserOnServer(token);
  if (!user) {
    destroyCookie(context, 'token', {
      path: '/',
    });
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const postId = context.query.id as string;
  const unreviewed = (context.query.unreviewed as string) === 'true';

  if (postId) {
    let post;
    if (unreviewed) {
      post = await fetchUnreviewedPost(token, postId);
    } else {
      post = await fetchPost(postId);
    }
    if (post && post.user === user._id) {
      return {
        props: { loadedPost: post, unreviewed },
      };
    }
    // 404
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};

export default EditPost;
