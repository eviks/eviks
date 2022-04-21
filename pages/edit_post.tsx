import React, { useEffect, useContext, useMemo, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Hidden from '@mui/material/Hidden';
import { AppContext } from '../store/appContext';
import EditPostStepper from '../components/editPost/EditPostStepper';
import EditPostGeneralInfo from '../components/editPost/EditPostGeneralInfo';
import EditPostMetro from '../components/editPost/EditPostMetro';
import EditPostEstateInfo from '../components/editPost/EditPostEstateInfo';
import EditPostBuildingInfo from '../components/editPost/EditPostBuildingInfo';
import { initPost } from '../actions/post';
import useWindowSize from '../utils/hooks/useWindowSize';

const EditPost: NextPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  const {
    state: { post, auth },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    // Check user authentication
    if (!auth.token) {
      router.replace('/auth');
    } else {
      setLoading(false);
    }
  }, [auth.token, router]);

  useEffect(() => {
    initPost()(dispatch);
  }, [dispatch]);

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
        return <EditPostMetro />;
      case 3:
        return <EditPostEstateInfo />;
      case 4:
        return <EditPostBuildingInfo />;
      default:
        return <EditPostGeneralInfo />;
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container
      disableGutters={fullScreenMode}
      sx={{ py: fullScreenMode ? 0 : 10 }}
    >
      <Paper elevation={width && width >= 900 ? 1 : 0} sx={{ p: { xs: 0 } }}>
        <Hidden mdDown>
          <EditPostStepper step={post.step ?? 0} />
        </Hidden>
        {renderStep()}
      </Paper>
    </Container>
  );
};

export default EditPost;
