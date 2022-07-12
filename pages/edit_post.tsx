import React, { useEffect, useContext, useMemo } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { parseCookies, destroyCookie } from 'nookies';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';
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
import { loadUserOnServer } from '../actions/auth';
import useWindowSize from '../utils/hooks/useWindowSize';

const EditPost: NextPage = () => {
  const router = useRouter();

  const {
    state: { post, auth },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    initPost()(dispatch);
  }, [dispatch]);

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
        return <EditPostImages />;
      case 6:
        return <EditPostPrice />;
      case 7:
        return <EditPostContacts />;
      default:
        return <EditPostGeneralInfo />;
    }
  };

  return (
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

  const check = await loadUserOnServer(token);
  if (!check) {
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

  return {
    props: {},
  };
};

export default EditPost;
