import React, { useEffect, useContext, useMemo } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Hidden from '@mui/material/Hidden';
import { AppContext } from '../store/appContext';
import EditPostStepper from '../components/editPost/EditPostStepper';
import EditPostGeneralInfo from '../components/editPost/EditPostGeneralInfo';
import { initPost } from '../actions/post';
import useWindowSize from '../utils/hooks/useWindowSize';

const CreatePost: NextPage = () => {
  const {
    state: { post },
    dispatch,
  } = useContext(AppContext);

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
      default:
        return <EditPostGeneralInfo />;
    }
  };

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

export default CreatePost;
